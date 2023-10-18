import {openmrsFetch} from '@openmrs/esm-framework'
import {AuditMessage} from '../types'
const s = 'byFullySpecifiedName'
const name = 'Lab+Samples'
const v =
  'custom:(uuid,name:(display,uuid),names:(display,conceptNameType,name),set,setMembers:(uuid,name:(display,uuid),names:(display,conceptNameType,name),set,setMembers:(uuid,name:(display,uuid),names:(display,conceptNameType,name),set,conceptClass:(uuid,name,description),setMembers:(uuid,name:(display,uuid),names:(display,conceptNameType,name),set,conceptClass:(uuid,name,description),setMembers:(uuid,name:(display,uuid),names:(display,conceptNameType,name),set,conceptClass:(uuid,name,description))))))'
const locale = localStorage.getItem('i18nextLng')

export const getPendingLabOrdersURL = (
  patientUuid: string,
  labOrderUuid: string,
) =>
  `/ws/rest/v1/bahmnicore/orders?orderTypeUuid=${labOrderUuid}&patientUuid=${patientUuid}`

export const getLabTests = () =>
  `/ws/rest/v1/concept?s=${s}&locale=${locale}&name=${name}&v=${v}`

export const getTestResults = (conceptUuid: string) =>
  `/ws/rest/v1/concept/${conceptUuid}?&locale=${locale}&v=bahmni`

export const getOrderTypeUuid = '/ws/rest/v1/ordertype'

export const uploadDocumentURL =
  '/ws/rest/v1/bahmnicore/visitDocument/uploadDocument'

export const saveDiagnosticReportURL = '/ws/fhir2/R4/DiagnosticReport'

export const auditLogURL = '/ws/rest/v1/auditlog'

export const auditLogGlobalPropertyURL =
  '/ws/rest/v1/bahmnicore/sql/globalproperty?property=bahmni.enableAuditLog'

export const configUrl = '/../bahmni_config/openmrs/apps/registration/app.json'
export const activePatientWithLabOrdersURL = locationUuid =>
  `/ws/rest/v1/bahmnicore/sql?location_uuid=${locationUuid}&q=emrapi.sqlSearch.activePatientsWithLabOrders&v=full`

export const getPayloadForUserLogin = (username: string): AuditMessage => ({
  eventType: 'ACCESSED_LAB_ENTRY',
  message: `User ${username} accessed lab entry module`,
  module: 'Lab Entry',
})

export const getPayloadForViewingPatientReport = (
  username: string,
  patientUuid: string,
  patientIdentifier: string,
  fileName: string,
  reportDate: string,
  labTest: string,
): AuditMessage => ({
  eventType: 'VIEWED_LAB_REPORT',
  message: `User ${username} viewed lab report [${fileName}] dated ${reportDate} for lab tests [${labTest}] for patient ${patientIdentifier}`,
  module: 'Lab Entry',
  patientUuid,
})

export const getPayloadForPatientAccess = (
  username: string,
  patientUuid: string,
  patientIdentifier: string,
): AuditMessage => ({
  eventType: 'ACCESSED_LAB_DASHBOARD',
  message: `User ${username} accessed lab dashboard for patient ${patientIdentifier}`,
  module: 'Lab Entry',
  patientUuid,
})

export const getPayloadForPatientReportUpload = (
  username: string,
  patientUuid: string,
  patientIdentifier: string,
  fileName: string,
  labTest: string,
): AuditMessage => ({
  eventType: 'EDIT_ENCOUNTER',
  message: `User ${username} uploaded lab report [${fileName}] for lab tests [${labTest}] for patient ${patientIdentifier}`,
  module: 'Lab Entry',
  patientUuid,
})

export const fetcher = (url: string) =>
  openmrsFetch(url, {
    method: 'GET',
  })

export const postApiCall = (url, data, abortController) => {
  return openmrsFetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
    signal: abortController.signal,
  })
}

export const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
}
