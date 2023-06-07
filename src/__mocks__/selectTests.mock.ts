import { LabTestResult } from "../types/selectTest"

export const mockLabTestsResponse:LabTestResult = {
  data: {
    results: [
      {
        uuid: '8160a011-3f10-11e4-adec-0800271c1b75',
        name: {
          display: 'Lab Samples',
          uuid: '81615942-3f10-11e4-adec-0800271c1b75',
        },
        names: [
          {
            display: 'Lab Samples',
            conceptNameType: 'FULLY_SPECIFIED',
            name: 'Lab Samples',
          },
          {
            display: 'Laboratory',
            conceptNameType: 'SHORT',
            name: 'Laboratory',
          },
        ],
        set: true,
        setMembers: [
          {
            uuid: '23c1ac3f-9aa9-4261-b434-622dab8fe2bd',
            name: {
              display: 'Blood',
              uuid: '10785344-806a-4c0d-87bc-661db187b338',
            },
            names: [
              {
                display: 'Blood',
                conceptNameType: 'FULLY_SPECIFIED',
                name: 'Blood',
              },
            ],
            set: true,
            conceptClass: {
              uuid: '0fb09bcb-47c6-11e4-8125-0800271c1b75',
              name: 'Sample',
              description: 'Lab Samples Concept Class',
            },
            setMembers: [
              {
                uuid: '07a128f7-f596-45d5-a2a9-c447bc9e5112',
                name: {
                  display: 'Absolute Eosinphil Count',
                  uuid: 'fd2ec116-74c9-4d48-86cf-1c7e8aa1a748',
                },
                names: [
                  {
                    display: 'Absolute Eosinphil Count',
                    conceptNameType: 'FULLY_SPECIFIED',
                    name: 'Absolute Eosinphil Count',
                  },
                ],
                set: false,
                conceptClass: {
                  uuid: '33a6291c-8a92-11e4-977f-0800271c1b75',
                  name: 'LabTest',
                  description: 'Lab Tests',
                },
                setMembers: [],
              },
              {
                uuid: '72ae28f1-4be4-499a-a8f5-aff54a11c9e3',
                name: {
                  display: 'Sickling Test',
                  uuid: '5d929c96-b566-4f3e-ba21-0b15b555cbb4',
                },
                names: [
                  {
                    display: 'Sickling Test',
                    conceptNameType: 'FULLY_SPECIFIED',
                    name: 'Sickling Test',
                  },
                ],
                set: false,
                conceptClass: {
                  uuid: '33a6291c-8a92-11e4-977f-0800271c1b75',
                  name: 'LabTest',
                  description: 'Lab Tests',
                },
                setMembers: [],
              },
              {
                uuid: 'fe769568-16da-4d9e-9c99-fbed0a8a60f5',
                name: {
                  display: 'Haemoglobin',
                  uuid: 'b8b8c317-43d2-4c4b-a67d-2ef3782c53eb',
                },
                names: [
                  {
                    display: 'Haemoglobin',
                    conceptNameType: 'FULLY_SPECIFIED',
                    name: 'Haemoglobin',
                  },
                ],
                set: false,
                conceptClass: {
                  uuid: '33a6291c-8a92-11e4-977f-0800271c1b75',
                  name: 'LabTest',
                  description: 'Lab Tests',
                },
                setMembers: [],
              },
              {
                uuid: 'c3d078ae-0dcf-4e69-bc59-a7eef9343b93',
                name: {
                  display: 'Total Leucocyte Count',
                  uuid: 'a1a46ef5-aafd-48e8-af02-8bafe6ccdaeb',
                },
                names: [
                  {
                    display: 'Total Leucocyte Count',
                    conceptNameType: 'FULLY_SPECIFIED',
                    name: 'Total Leucocyte Count',
                  },
                ],
                set: false,
                conceptClass: {
                  uuid: '33a6291c-8a92-11e4-977f-0800271c1b75',
                  name: 'Test',
                  description:
                    'Acq. during patient encounter (vitals, labs, etc.)',
                },
                setMembers: [],
              },
              {
                uuid: '5b0cdc41-7371-4c2f-a1e4-ed1bf7416a8d',
                name: {
                  display: 'Anaemia Panel',
                  uuid: '8ce76a2c-e63d-4358-aabb-f8c5a6239fbd',
                },
                names: [
                  {
                    display: 'Anaemia Panel',
                    conceptNameType: 'FULLY_SPECIFIED',
                    name: 'Anaemia Panel',
                  },
                ],
                set: true,
                conceptClass: {
                  uuid: '8d492026-c2cc-11de-8d13-0010c6dffd0f',
                  name: 'LabSet',
                  description: 'Panels',
                },
                setMembers: [
                  {
                    uuid: '07a128f7-f596-45d5-a2a9-c447bc9e5112',
                    name: {
                      display: 'Absolute Eosinphil Count',
                      uuid: 'fd2ec116-74c9-4d48-86cf-1c7e8aa1a748',
                    },
                    names: [
                      {
                        display: 'Absolute Eosinphil Count',
                        conceptNameType: 'FULLY_SPECIFIED',
                        name: 'Absolute Eosinphil Count',
                      },
                    ],
                    set: false,
                    conceptClass: {
                      uuid: '33a6291c-8a92-11e4-977f-0800271c1b75',
                      name: 'LabTest',
                      description: 'Lab Tests',
                    },
                    setMembers: [],
                  },
                  {
                    uuid: 'fe769568-16da-4d9e-9c99-fbed0a8a60f5',
                    name: {
                      display: 'Haemoglobin',
                      uuid: 'b8b8c317-43d2-4c4b-a67d-2ef3782c53eb',
                    },
                    names: [
                      {
                        display: 'Haemoglobin',
                        conceptNameType: 'FULLY_SPECIFIED',
                        name: 'Haemoglobin',
                      },
                    ],
                    set: false,
                    conceptClass: {
                      uuid: '33a6291c-8a92-11e4-977f-0800271c1b75',
                      name: 'LabTest',
                      description: 'Lab Tests',
                    },
                    setMembers: [],
                  },
                ],
              },
              {
                uuid: 'ec22edfc-76ff-482a-b89b-022b9c3e34d0',
                name: {
                  display: 'TLC',
                  uuid: 'd3458ce6-5558-4709-88ee-4612dafc0083',
                },
                names: [
                  {
                    display: 'TLC',
                    conceptNameType: 'FULLY_SPECIFIED',
                    name: 'TLC',
                  },
                ],
                set: true,
                conceptClass: {
                  uuid: '8d492026-c2cc-11de-8d13-0010c6dffd0f',
                  name: 'LabSet',
                  description: 'Panels',
                },
                setMembers: [
                  {
                    uuid: '07a128f7-f596-45d5-a2a9-c447bc9e5112',
                    name: {
                      display: 'Absolute Eosinphil Count',
                      uuid: 'fd2ec116-74c9-4d48-86cf-1c7e8aa1a748',
                    },
                    names: [
                      {
                        display: 'Absolute Eosinphil Count',
                        conceptNameType: 'FULLY_SPECIFIED',
                        name: 'Absolute Eosinphil Count',
                      },
                    ],
                    set: false,
                    conceptClass: {
                      uuid: '33a6291c-8a92-11e4-977f-0800271c1b75',
                      name: 'LabTest',
                      description: 'Lab Tests',
                    },
                    setMembers: [],
                  },
                  {
                    uuid: 'c3d078ae-0dcf-4e69-bc59-a7eef9343b93',
                    name: {
                      display: 'Total Leucocyte Count',
                      uuid: 'a1a46ef5-aafd-48e8-af02-8bafe6ccdaeb',
                    },
                    names: [
                      {
                        display: 'Total Leucocyte Count',
                        conceptNameType: 'FULLY_SPECIFIED',
                        name: 'Total Leucocyte Count',
                      },
                    ],
                    set: false,
                    conceptClass: {
                      uuid: '33a6291c-8a92-11e4-977f-0800271c1b75',
                      name: 'LabTest',
                      description: 'Lab Tests',
                    },
                    setMembers: [],
                  },
                ],
              },
              {
                uuid: 'c3d078ae-0dcf-4e69-bc59-76gv934hg373',
                name: {
                  display: 'Systolic blood pressure',
                  uuid: 'a1a46ef5-aafd-48e8-af02-8bafe6ccdaeb',
                },
                names: [
                  {
                    display: 'Systolic blood pressure short name',
                    conceptNameType: 'SHORT',
                    name: 'Systolic blood pressure short name',
                  },
                ],
                set: false,
                conceptClass: {
                  uuid: '33a6291c-8a92-11e4-977f-0800271c1b75',
                  name: 'Test',
                  description:
                    'Acq. during patient encounter (vitals, labs, etc.)',
                },
                setMembers: [],
              },
            ],
          },
        ],
      },
    ],
  },
}

export const mockLabTestsErrorResponse = {
  message: 'Data not found',
  response: {
    status: 404,
    statusText: 'Not Found',
  },
}

export const mockLabTestsPendingResponse = {
  message: 'Data not found',
  response: {
    status: 202,
    statusText: 'Pending',
  },
}

export const mockUploadFileResponse = {
  data: {
    url: '100/76-Patient Document-7baff463-fdaa-43d0-a402-aa948c296958.pdf',
  },
  ok: 'true',
  status: 200,
}

export const mockDiagnosticReportResponse = {
  data: {
    id: 'e950a76d-30b8-4005-b3a6-e8fa2d5888ef',
    subject: {
      display: 'GAN001100',
    },
  },
  ok: 'true',
  status: 200,
}

export const mockDiagnosticReportErrorResponse = {
  message: 'Internal Server Error',
  response: {
    status: 500,
    statusText: 'Internal Server Error',
  },
}

export const mockAlltestAndPanels = [
  {
    uuid: '07a128f7-f596-45d5-a2a9-c447bc9e5112',
    name: {
      display: 'Absolute Eosinphil Count',
      uuid: 'fd2ec116-74c9-4d48-86cf-1c7e8aa1a748',
    },
    names: [
      {
        display: 'Absolute Eosinphil Count',
        conceptNameType: 'FULLY_SPECIFIED',
        name: 'Absolute Eosinphil Count',
      },
    ],
    set: false,
    conceptClass: {
      uuid: '33a6291c-8a92-11e4-977f-0800271c1b75',
      name: 'LabTest',
      description: 'Lab Tests',
    },
    setMembers: [],
  },
  {
    uuid: '72ae28f1-4be4-499a-a8f5-aff54a11c9e3',
    name: {
      display: 'Sickling Test',
      uuid: '5d929c96-b566-4f3e-ba21-0b15b555cbb4',
    },
    names: [
      {
        display: 'Sickling Test',
        conceptNameType: 'FULLY_SPECIFIED',
        name: 'Sickling Test',
      },
    ],
    set: false,
    conceptClass: {
      uuid: '33a6291c-8a92-11e4-977f-0800271c1b75',
      name: 'LabTest',
      description: 'Lab Tests',
    },
    setMembers: [],
  },
  {
    uuid: 'fe769568-16da-4d9e-9c99-fbed0a8a60f5',
    name: {
      display: 'Haemoglobin',
      uuid: 'b8b8c317-43d2-4c4b-a67d-2ef3782c53eb',
    },
    names: [
      {
        display: 'Haemoglobin',
        conceptNameType: 'FULLY_SPECIFIED',
        name: 'Haemoglobin',
      },
    ],
    set: false,
    conceptClass: {
      uuid: '33a6291c-8a92-11e4-977f-0800271c1b75',
      name: 'LabTest',
      description: 'Lab Tests',
    },
    setMembers: [],
  },
  {
    uuid: 'c3d078ae-0dcf-4e69-bc59-a7eef9343b93',
    name: {
      display: 'Total Leucocyte Count',
      uuid: 'a1a46ef5-aafd-48e8-af02-8bafe6ccdaeb',
    },
    names: [
      {
        display: 'Total Leucocyte Count',
        conceptNameType: 'FULLY_SPECIFIED',
        name: 'Total Leucocyte Count',
      },
    ],
    set: false,
    conceptClass: {
      uuid: '33a6291c-8a92-11e4-977f-0800271c1b75',
      name: 'Test',
      description: 'Acq. during patient encounter (vitals, labs, etc.)',
    },
    setMembers: [],
  },
  {
    uuid: '5b0cdc41-7371-4c2f-a1e4-ed1bf7416a8d',
    name: {
      display: 'Anaemia Panel',
      uuid: '8ce76a2c-e63d-4358-aabb-f8c5a6239fbd',
    },
    names: [
      {
        display: 'Anaemia Panel',
        conceptNameType: 'FULLY_SPECIFIED',
        name: 'Anaemia Panel',
      },
    ],
    set: true,
    conceptClass: {
      uuid: '8d492026-c2cc-11de-8d13-0010c6dffd0f',
      name: 'LabSet',
      description: 'Panels',
    },
    setMembers: [
      {
        uuid: '07a128f7-f596-45d5-a2a9-c447bc9e5112',
        name: {
          display: 'Absolute Eosinphil Count',
          uuid: 'fd2ec116-74c9-4d48-86cf-1c7e8aa1a748',
        },
        names: [
          {
            display: 'Absolute Eosinphil Count',
            conceptNameType: 'FULLY_SPECIFIED',
            name: 'Absolute Eosinphil Count',
          },
        ],
        set: false,
        conceptClass: {
          uuid: '33a6291c-8a92-11e4-977f-0800271c1b75',
          name: 'LabTest',
          description: 'Lab Tests',
        },
        setMembers: [],
      },
      {
        uuid: 'fe769568-16da-4d9e-9c99-fbed0a8a60f5',
        name: {
          display: 'Haemoglobin',
          uuid: 'b8b8c317-43d2-4c4b-a67d-2ef3782c53eb',
        },
        names: [
          {
            display: 'Haemoglobin',
            conceptNameType: 'FULLY_SPECIFIED',
            name: 'Haemoglobin',
          },
        ],
        set: false,
        conceptClass: {
          uuid: '33a6291c-8a92-11e4-977f-0800271c1b75',
          name: 'LabTest',
          description: 'Lab Tests',
        },
        setMembers: [],
      },
    ],
  },
  {
    uuid: 'ec22edfc-76ff-482a-b89b-022b9c3e34d0',
    name: {
      display: 'TLC',
      uuid: 'd3458ce6-5558-4709-88ee-4612dafc0083',
    },
    names: [
      {
        display: 'TLC',
        conceptNameType: 'FULLY_SPECIFIED',
        name: 'TLC',
      },
    ],
    set: true,
    conceptClass: {
      uuid: '8d492026-c2cc-11de-8d13-0010c6dffd0f',
      name: 'LabSet',
      description: 'Panels',
    },
    setMembers: [
      {
        uuid: '07a128f7-f596-45d5-a2a9-c447bc9e5112',
        name: {
          display: 'Absolute Eosinphil Count',
          uuid: 'fd2ec116-74c9-4d48-86cf-1c7e8aa1a748',
        },
        names: [
          {
            display: 'Absolute Eosinphil Count',
            conceptNameType: 'FULLY_SPECIFIED',
            name: 'Absolute Eosinphil Count',
          },
        ],
        set: false,
        conceptClass: {
          uuid: '33a6291c-8a92-11e4-977f-0800271c1b75',
          name: 'LabTest',
          description: 'Lab Tests',
        },
        setMembers: [],
      },
      {
        uuid: 'c3d078ae-0dcf-4e69-bc59-a7eef9343b93',
        name: {
          display: 'Total Leucocyte Count',
          uuid: 'a1a46ef5-aafd-48e8-af02-8bafe6ccdaeb',
        },
        names: [
          {
            display: 'Total Leucocyte Count',
            conceptNameType: 'FULLY_SPECIFIED',
            name: 'Total Leucocyte Count',
          },
        ],
        set: false,
        conceptClass: {
          uuid: '33a6291c-8a92-11e4-977f-0800271c1b75',
          name: 'LabTest',
          description: 'Lab Tests',
        },
        setMembers: [],
      },
    ],
  },
]

export const uploadFileRequestBody =
  '{"content":",Y29udGVudA==","encounterTypeName":"LAB_RESULT","fileType":"application","format":"pdf","patientUuid":"123"}'

export const diagnosticReportRequestBody = reportDate =>
  `{"resourceType":"DiagnosticReport","status":"final","code":{"coding":[{"code":"07a128f7-f596-45d5-a2a9-c447bc9e5112","display":"Absolute Eosinphil Count"}]},"subject":{"reference":"Patient/123"},"issued":"${reportDate}","presentedForm":[{"url":"100/76-Patient Document-7baff463-fdaa-43d0-a402-aa948c296958.pdf","title":"test.pdf"}],"conclusion":"Normal Report","performer":[{"reference":"Practitioner/1"}]}`

export const selfDiagnosticRequestBody = reportDate =>
  `{"resourceType":"DiagnosticReport","status":"final","code":{"coding":[{"code":"07a128f7-f596-45d5-a2a9-c447bc9e5112","display":"Absolute Eosinphil Count"}]},"subject":{"reference":"Patient/123"},"issued":"${reportDate}","presentedForm":[{"url":"100/76-Patient Document-7baff463-fdaa-43d0-a402-aa948c296958.pdf","title":"test.pdf"}]}`
export const diagnosticReportRequestBodyWithBasedOn = reportDate =>
  `{"resourceType":"DiagnosticReport","status":"final","code":{"coding":[{"code":"07a128f7-f596-45d5-a2a9-c447bc9e5112","display":"Absolute Eosinphil Count"}]},"subject":{"reference":"Patient/123"},"issued":"${reportDate}","presentedForm":[{"url":"100/76-Patient Document-7baff463-fdaa-43d0-a402-aa948c296958.pdf","title":"test.pdf"}],"basedOn":[{"identifier":{"value":"abc-123"},"reference":"ServiceRequest","display":"Absolute Eosinphil Count"}],"performer":[{"reference":"Practitioner/1"}]}`
export const testResultsdiagnosticReportRequestBody = reportDate =>`{"resourceType":"DiagnosticReport","status":"final","code":{"coding":[{"code":"07a128f7-f596-45d5-a2a9-c447bc9e5112"}]},"subject":{"reference":"Patient/123"},"issued":"${reportDate}","contained":[{"resourceType":"Observation","id":"example-result-1","status":"final","code":{"coding":[{"code":"07a128f7-f596-45d5-a2a9-c447bc9e5112"}]},"subject":{"reference":"Patient/123"},"valueBoolean":false}],"result":[{"reference":"#example-result-1","type":"Observation"}],"conclusion":"Normal Report","basedOn":[{"identifier":{"value":"abc-123"},"reference":"ServiceRequest"}],"performer":[{"reference":"Practitioner/1"}]}`
export const testResultsdiagnosticNumericReportRequestBody = reportDate =>`{"resourceType":"DiagnosticReport","status":"final","code":{"coding":[{"code":"1643AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"}]},"subject":{"reference":"Patient/123"},"issued":"${reportDate}","contained":[{"resourceType":"Observation","id":"example-result-1","status":"final","code":{"coding":[{"code":"1643AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"}]},"subject":{"reference":"Patient/123"},"valueQuantity":{"value":"7"}}],"result":[{"reference":"#example-result-1","type":"Observation"}],"conclusion":"Normal Report","basedOn":[{"identifier":{"value":"abe-123"},"reference":"ServiceRequest"}],"performer":[{"reference":"Practitioner/2"}]}`
