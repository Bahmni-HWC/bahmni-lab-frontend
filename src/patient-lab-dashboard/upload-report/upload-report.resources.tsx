import {FetchResponse} from '@openmrs/esm-framework'
import {Contained, Datatype, PendingLabOrders} from '../../types'
import {LabTest} from '../../types/selectTest'
import {
  postApiCall,
  saveDiagnosticReportURL,
  uploadDocumentURL,
} from '../../utils/api-utils'
import {uploadedDocumentEncounterType} from '../../utils/constants'
import {getTestName} from '../../utils/helperFunctions'

interface UploadFileResponseType {
  url: string
}

interface ReferenceRequestType {
  reference: string
}

export interface BasedOnType {
  reference: string
  display: string
  identifier: {
    value: string
  }
}

export interface Observation {
  reference: string
  type: string
}

interface DiagnosticReportRequestType {
  resourceType: string
  status: string
  code: {
    coding: [
      {
        code: string
        display: string
      },
    ]
  }
  subject: ReferenceRequestType
  encounter?: {reference: string}
  issued: Date
  conclusion?: string
  presentedForm: Array<{
    url: string
    title: string
  }>
  basedOn?: Array<BasedOnType>
  performer?: Array<ReferenceRequestType>
}

interface TestResultDiagnosticReportRequestType {
  resourceType: string
  status: string
  code: {
    coding: [
      {
        code: string
        display: string
      },
    ]
  }
  subject: ReferenceRequestType
  encounter?: {reference: string}
  issued: Date
  conclusion?: string
  basedOn?: Array<BasedOnType>
  performer?: Array<ReferenceRequestType>
  contained: Array<Contained>
  result?: Array<Observation>
}

export function uploadFile(
  patientUuid: string,
  fileContent: string,
  fileType: string,
  ac: AbortController,
): Promise<FetchResponse<UploadFileResponseType>> {
  const requestBody = uploadFileRequestBody(fileContent, fileType, patientUuid)
  return postApiCall(uploadDocumentURL, requestBody, ac)
}

const uploadFileRequestBody = (fileContent, fileType, patientUuid) => {
  const extension = fileType.split('/')[1]
  return {
    content: removeBase64(fileContent),
    encounterTypeName: uploadedDocumentEncounterType,
    fileType: fileType.split('/')[0],
    format: extension,
    patientUuid: patientUuid,
  }
}

export function saveDiagnosticReport(
  encounter,
  patientUuid: string,
  performerUuid: string,
  reportDate: Date,
  selectedTest: LabTest,
  uploadFileUrl: string,
  uploadedFileName: string,
  reportConclusion: string,
  ac: AbortController,
  selectedPendingOrder: PendingLabOrders[],
) {
  let basedOn: Array<BasedOnType> = null
  const selectedPendingOrderTest = getSelectedPendingOrderTests(
    selectedTest,
    selectedPendingOrder,
  )
  if (selectedPendingOrderTest.length === 1)
    basedOn = [
      {
        identifier: {value: selectedPendingOrderTest[0].id},
        reference: 'ServiceRequest',
        display: getTestName(selectedTest),
      },
    ]
  const requestBody: DiagnosticReportRequestType = {
    resourceType: 'DiagnosticReport',
    status: 'final',
    code: {
      coding: [
        {
          code: selectedTest.uuid,
          display: getTestName(selectedTest),
        },
      ],
    },
    subject: {
      reference: 'Patient/' + patientUuid,
    },
    issued: reportDate,
    presentedForm: [{url: uploadFileUrl, title: uploadedFileName}],
  }
  if (reportConclusion) {
    requestBody.conclusion = reportConclusion
  }
  if (selectedPendingOrderTest.length === 1) {
    requestBody.basedOn = basedOn
  }
  if (performerUuid) {
    requestBody.performer = [
      {
        reference: 'Practitioner/' + performerUuid,
      },
    ]
  }
  if (encounter && encounter.encounterUuid) {
    requestBody.encounter = {
      reference: `Encounter/${encounter.encounterUuid}`,
    }
  }

  return postApiCall(saveDiagnosticReportURL, requestBody, ac)
}

export function saveTestDiagnosticReport(
  encounter,
  patientUuid: string,
  performerUuid: string,
  selectedTest: LabTest,
  reportDate: Date,
  reportConclusion: string,
  ac: AbortController,
  selectedPendingOrder: PendingLabOrders,
  labResult: Map<
    string,
    {value: string; abnormal?: boolean; codableConceptUuid?: string}
  >,
  dataType: Datatype[],
) {
  let basedOn: Array<BasedOnType> = null
  if (selectedPendingOrder)
    basedOn = [
      {
        identifier: {value: selectedPendingOrder.id},
        reference: 'ServiceRequest',
        display: selectedPendingOrder.testName,
      },
    ]

  let containedArray: Contained[] = []

  const createObservation = (item, index) => {
    const observation: Contained = {
      resourceType: 'Observation',
      id: `lab-test-result${index + 1}`,
      status: 'final',
      code: {
        coding: [
          {
            code: item.uuid,
            display: item.name.display,
          },
        ],
      },
      subject: {reference: `Patient/${patientUuid}`},
    }

    const labItem = labResult.get(item.uuid)

    if (labItem?.abnormal === true) {
      observation.interpretation = [
        {
          coding: [
            {
              code: 'A',
            },
          ],
        },
      ]
    }

    switch (dataType[index]?.name) {
      case 'Boolean':
        observation.valueBoolean = labItem?.value.toLowerCase() === 'true'
        break
      case 'Numeric':
        observation.valueQuantity = {
          value: labItem?.value,
        }
        break
      case 'Coded':
        observation.valueCodeableConcept = {
          coding: [
            {
              code: labItem?.codableConceptUuid,
              display: labItem?.value,
            },
          ],
        }
        break
      default:
        observation.valueString = labItem?.value
    }

    return observation
  }

  if (selectedTest.setMembers && selectedTest.setMembers.length > 0) {
    containedArray = selectedTest.setMembers.map(createObservation)
  } else {
    const observation = createObservation(selectedTest, 0)
    containedArray.push(observation)
  }

  const resultArray = containedArray.map(item => {
    return {
      reference: `#${item.id}`,
      type: 'Observation',
    }
  })

  const requestBody: TestResultDiagnosticReportRequestType = {
    resourceType: 'DiagnosticReport',
    status: 'final',
    code: {
      coding: [
        {
          code: selectedPendingOrder.conceptUuid,
          display: selectedPendingOrder.testName,
        },
      ],
    },
    subject: {
      reference: 'Patient/' + patientUuid,
    },
    issued: reportDate,
    contained: containedArray,
    result: resultArray,
  }
  if (reportConclusion) {
    requestBody.conclusion = reportConclusion
  }

  requestBody.basedOn = basedOn
  if (performerUuid) {
    requestBody.performer = [
      {
        reference: 'Practitioner/' + performerUuid,
      },
    ]
  }
  if (encounter && encounter.encounterUuid) {
    requestBody.encounter = {
      reference: `Encounter/${encounter.encounterUuid}`,
    }
  }

  return postApiCall(saveDiagnosticReportURL, requestBody, ac)
}

const removeBase64 = fileData => {
  const searchStr = ';base64'
  return fileData.substring(
    fileData.indexOf(searchStr) + searchStr.length,
    fileData.length,
  )
}

const getSelectedPendingOrderTests = (
  selectedTest: LabTest,
  selectedPendingOrder: PendingLabOrders[],
): PendingLabOrders[] => {
  return selectedPendingOrder.filter(
    pendingOrder => pendingOrder.conceptUuid === selectedTest.uuid,
  )
}
