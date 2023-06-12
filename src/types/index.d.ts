import {boolean, number, string} from 'yup'

export interface LabOrders {
  concept: Concept
  orderDate: number
  orderUuid: string
  provider: string
  providerUuid: string
  fulfillerStatus: string
}

interface Concept {
  name: string
  uuid: string
  shortName?: string
}
export interface LabOrdersFetchResponse {
  data: Array<LabOrders>
}
export interface DoctorDetailsData {
  uuid: string
  person: {display: string}
  attributes: Array<Attribute>
}

export interface DoctorsResponse {
  data: {results: Array<DoctorDetailsData>}
}
interface GeneralInfo {
  uuid: string
  display: string
  links: [Links]
}

interface Links {
  rel: string
  uri: string
  resourceAlias?: string
}

interface OrderType {
  uuid: string
  display: string
  name: string
  javaClassName: string
  retired: boolean
  description: string
  conceptClasses: Array<GeneralInfo>
  parent: any
  links: Array<Links>
  resourceVersion: string
}

interface ReportPresentedForm {
  contentType: string
  language: string
  url: string
  hash: string
  title: string
  creation: Date
}

interface ReportCoding {
  system: string
  code: string
  display: string
}
interface ReportCode {
  coding: Array<ReportCoding>
}
interface ReportResource {
  resourceType: string
  id: string
  meta: Meta2
  status: string
  code: Code
  presentedForm: Array<ReportPresentedForm>
}
interface ReportEntry {
  fullUrl: string
  resource: Resource
}
export interface ReportTableFetchResponse {
  data: {
    resourceType: string
    id: string
    entry: Array<ReportEntry>
    total: number
  }
}

export interface PendingLabOrders {
  id: string
  testName: string
  date: string
  orderedBy: string
  providerUuid: string
  conceptUuid: string
}

export interface Attribute {
  display: string
  uuid: string
  attributeType: {
    uuid: string
    display: string
    retired: undefined | boolean
    links: Array<Links>
  }
  value: boolean
  voided: boolean
  links: Array<Links>
}
export interface ReportTableRow {
  id: string
  tests: string
  url: string
  date: string
  requester: string
  file: string
  conclusion: string
}
export interface OrderTypeFetchResponse {
  data: {
    results: Array<OrderType>
  }
}

export interface OrderType {
  uuid: string
  display: string
  links: Links
}

export interface AuditMessage {
  patientUuid?: string
  eventType: string
  message: string
  module: string
}

export interface ImagePreviewComponentProps {
  url: string
  fileName: string
  auditMessage: AuditMessage
  postAuditMessage: Function
}
interface Name {
  display: string
  uuid: string
  name: string
  locale: string
  localePreferred: boolean
  conceptNameType: string
  links: Links
  resourceVersion: string
}
interface ValueQuantity {
  value: string
}
interface Subject {
  reference: string
}

interface Contained {
  resourceType: string
  id: string
  status: string
  code: {
    coding: [
      {
        code: string
        display: string
      },
    ]
  }
  subject: Subject
  valueQuantity?: ValueQuantity
  valueCodeableConcept?: {
    coding: [
      {
        code: string
        display: string
      },
    ]
  }
  valueBoolean?: boolean
  valueString?: string
  interpretation?: Array<{
    coding: [
      {
        code: string
      },
    ]
  }>
}

export interface TestResultsLabOrder {
  data: {
    uuid: string
    name: Name
    names: Array<Name>
    set: boolean
    datatype: Datatype
    conceptClass: Datatype
    hiNormal: string
    hiAbsolute: string
    hiCritical: string
    lowNormal: string
    lowAbsolute: string
    lowCritical: string
    units: string
    allowDecimal: string
    handler: string
    descriptions: Array<Descriptions>
    answers: any
    setMembers: Array<TestResultsLabOrder> //doubt
    resourceVersion: string
  }
}
interface Datatype {
  uuid: string
  display: string
  name: string
  description: string
  hl7Abbreviation?: string
  retired: false
  links: Array<Links>
  resourceVersion: string
}
interface Descriptions {
  display: string
  uuid: string
  description: string
  locale: string
  links: Array<Links>
  resourceVersion: string
}
export interface LabConfigResponse {
  data: {
    labLite: {
      id: string
      extensionPointId: string
      type: string
      translationKey: string
      url: string
      icon: string
      order: number
      captureTestResults: boolean
      requiredPrivilege: string
    }
  }
}
