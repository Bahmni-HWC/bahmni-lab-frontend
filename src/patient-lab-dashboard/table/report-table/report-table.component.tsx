import {usePagination} from '@openmrs/esm-framework'
import {PatientChartPagination} from '@openmrs/esm-patient-common-lib'
import {
  DataTable,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableExpandedRow,
  TableExpandHeader,
  TableExpandRow,
  TableHead,
  TableHeader,
  TableRow,
} from 'carbon-components-react'
import React, {useEffect, useMemo} from 'react'
import useSWR, {mutate} from 'swr'
import Loader from '../../../common/loader/loader.component'
import {
  useAllTestAndPanel,
  useLabTestResultsContext,
} from '../../../context/lab-test-results-context'
import {
  AuditMessage,
  ReportEntry,
  ReportResource,
  ReportTableFetchResponse,
  ReportTableRow,
} from '../../../types'
import {LabTest, LabTestResult} from '../../../types/selectTest'
import {
  auditLogURL,
  getLabTests,
  getPayloadForViewingPatientReport,
  postApiCall,
  swrOptions,
} from '../../../utils/api-utils'
import {
  defaultPageSize,
  documentPath,
  isAuditLogEnabledKey,
  loggedInUserKey,
  reportHeaders,
  selfPatient,
} from '../../../utils/constants'
import {getShortName} from '../../../utils/helperFunctions'
import {fetcher, getReportTableDataURL} from '../../../utils/lab-orders'
import ImagePreviewComponent from '../../image-preview-component/image-preview-component'
import classes from './report-table.component.scss'

function getReportUrl(reportsData: Array<ReportTableRow>, reportId: string) {
  const url = reportsData?.find(intialRow => intialRow.id === reportId)?.url

  return url ? `${documentPath}${url}` : ''
}

interface ReportTableProps {
  patientUuid: string
  reloadTableData?: boolean
}

const ReportTable = (props: ReportTableProps) => {
  const {patientUuid, reloadTableData} = props
  const reportTableDataUrl = getReportTableDataURL(patientUuid)
  const {
    labTestResults,
    setLabTestResults,
    setLabTestResultsError,
  } = useLabTestResultsContext()

  const {allTestsAndPanels, setAllTestsAndPanels} = useAllTestAndPanel()
  const temp = []

  useEffect(() => {
    if (reloadTableData) {
      mutate(reportTableDataUrl)
    }
  }, [reloadTableData, reportTableDataUrl])

  let {data: reports, error: reportsTableDataError} = useSWR<
    ReportTableFetchResponse,
    Error
  >(getReportTableDataURL(patientUuid), fetcher)

  const {data: testResults, error: testResultsError} = useSWR<
    LabTestResult,
    Error
  >(getLabTests, fetcher, swrOptions)
  const getRequester = (
    performer: undefined | {display: string; reference: string},
  ) => {
    if (performer) {
      return performer[0]?.display.replace(/\s\(.+\)/g, '')
    }
    return selfPatient
  }

  useEffect(() => {
    if (testResults) {
      setLabTestResults({...testResults})
      const labOrder = testResults?.data?.results[0]
      labOrder &&
        getTestsInLabOrder(labOrder)?.forEach(sample => {
          getTestsInLabOrder(sample).forEach((tests: LabTest) => {
            setAllTestsAndPanels(allTestsAndPanels => [
              ...allTestsAndPanels,
              tests,
            ])
          })
        })
    }
    if (testResultsError) setLabTestResultsError(testResultsError)
  }, [testResults, testResultsError])

  const getTestsInLabOrder = (labOrder: LabTest) => labOrder?.setMembers

  let rows = useMemo(() => {
    const uniqueUploadedReports: Array<ReportEntry> = dedupe(
      reports?.data?.entry,
    )
    return uniqueUploadedReports
      ?.sort((reportEntry1, reportEntry2) => {
        return (
          new Date(reportEntry2.resource.issued).getTime() -
          new Date(reportEntry1.resource.issued).getTime()
        )
      })
      .map(row => {
        if (row !== undefined) {
          const title = row.resource?.presentedForm[0]?.title

          return {
            id: row.resource.id,
            tests: getShortName(
              row.resource.code.coding[0]?.display,
              allTestsAndPanels,
            ),
            url: row.resource?.presentedForm[0]?.url,
            date: new Date(row.resource.issued).toLocaleDateString(
              localStorage.getItem('i18nextLng'),
              {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
              },
            ),
            requester: getRequester(row.resource.performer),
            file: title,
            conclusion: row.resource.conclusion ? row.resource.conclusion : '',
            patientId: row.resource.subject.display,
          }
        }
      })
  }, [reports])

  if (rows.length > 0) {
    rows.map(row => {
      if (row !== undefined) temp.push(row)
    })
    rows = temp
  }

  const {results: paginatedReportsTable, goTo, currentPage} = usePagination(
    rows,
    defaultPageSize,
  )

  if (reportsTableDataError || testResultsError)
    return (
      <div>Something went wrong in fetching Report tables or Lab Tests...</div>
    )

  return (
    <div title="report-table">
      <>
        <h4>Reports table</h4>
        {(!testResultsError && !labTestResults) ||
        (!reports && !reportsTableDataError) ? (
          <Loader />
        ) : null}
        <DataTable rows={paginatedReportsTable} headers={reportHeaders}>
          {({
            rows: dataTableRows,
            headers,
            getHeaderProps,
            getRowProps,
            getTableProps,
            getTableContainerProps,
          }) => (
            <TableContainer {...getTableContainerProps()}>
              <Table
                {...getTableProps()}
                className={classes.reportTable}
                useZebraStyles={true}
              >
                <TableHead>
                  <TableRow>
                    <TableExpandHeader id="expand" />
                    {headers.map((header, i) => (
                      <TableHeader
                        id={header.header}
                        key={`${header.header}-${i}`}
                        className={
                          header.key === 'tests' && classes.stickyColumn
                        }
                        {...getHeaderProps({header})}
                      >
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows?.length > 0 ? (
                    dataTableRows.map((row, index) => {
                      const rowIndex = getReportTableRowIndex(
                        currentPage,
                        index,
                      )
                      return (
                        <React.Fragment key={row.id}>
                          <TableExpandRow {...getRowProps({row})}>
                            {row.cells.map(cell => {
                              return cell.id.endsWith('file') ? (
                                <TableCell key={cell.id}>
                                  {cell.value?.endsWith('pdf') ? (
                                    <Link
                                      href={getReportUrl(rows, row.id)}
                                      target={'_blank'}
                                      onClick={() => {
                                        const auditMessage = getAuditMessageBody(
                                          patientUuid,
                                          rows[rowIndex]?.file ?? '',
                                          rows[rowIndex]?.date,
                                          getPatientIdentifier(
                                            rows[rowIndex]?.patientId,
                                          ),
                                          rows[rowIndex]?.tests,
                                          allTestsAndPanels,
                                        )
                                        postAuditMessage(auditMessage)
                                      }}
                                    >
                                      {cell.value}
                                    </Link>
                                  ) : (
                                    <ImagePreviewComponent
                                      url={getReportUrl(rows, row.id)}
                                      fileName={cell.value}
                                      auditMessage={getAuditMessageBody(
                                        patientUuid,
                                        rows[rowIndex]?.file,
                                        rows[rowIndex]?.date,
                                        getPatientIdentifier(
                                          rows[rowIndex]?.patientId,
                                        ),
                                        rows[rowIndex]?.tests,
                                        allTestsAndPanels,
                                      )}
                                      postAuditMessage={postAuditMessage}
                                    />
                                  )}
                                </TableCell>
                              ) : (
                                <TableCell
                                  key={cell.id}
                                  className={
                                    cell.id.includes('tests') &&
                                    classes.stickyColumn
                                  }
                                >
                                  {cell.value}
                                </TableCell>
                              )
                            })}
                          </TableExpandRow>
                          <TableExpandedRow colSpan={reportHeaders.length + 1}>
                            <div
                              style={{overflowWrap: 'anywhere'}}
                            >{`Report conclusion : ${
                              rows?.filter(
                                intialRow => intialRow.id === row.id,
                              )[0]?.conclusion
                            }`}</div>
                          </TableExpandedRow>
                        </React.Fragment>
                      )
                    })
                  ) : (
                    <TableExpandedRow colSpan={reportHeaders.length + 1}>
                      No previous reports found for this patient
                    </TableExpandedRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DataTable>
        {rows?.length > 0 && (
          <PatientChartPagination
            pageNumber={currentPage}
            pageSize={defaultPageSize}
            currentItems={paginatedReportsTable?.length}
            totalItems={rows?.length}
            onPageNumberChange={({page}) => {
              goTo(page)
            }}
          />
        )}
      </>
    </div>
  )
}

function url(resource: ReportResource) {
  return resource?.presentedForm ? resource?.presentedForm[0].url : ''
}
function code(resource: ReportResource) {
  return resource.code.coding[0].display
}

function getUniqueReportUrls(diagnosticReport: ReportEntry[]) {
  return new Set<string>(diagnosticReport?.map(report => url(report.resource)))
}

function dedupe(diagnosticReport: Array<ReportEntry>) {
  return Array.from(getUniqueReportUrls(diagnosticReport)).map(reportUrl => {
    if (reportUrl != '') {
      return diagnosticReport.reduce<ReportEntry | undefined>((acc, curr) => {
        if (url(curr.resource) === reportUrl) {
          if (acc)
            acc.resource.code.coding[0].display = `${code(
              acc.resource,
            )}, ${code(curr.resource)}`
          else return curr
        }
        return acc
      }, undefined)
    }
    return undefined
  })
}

const getPatientIdentifier = (displayName: string) => {
  if (displayName) {
    const words = displayName.match(/\w+/g)
    return words[words.length - 1]
  }
}

function getAuditMessageBody(
  patientUuid: string,
  fileName: string,
  reportDate: string,
  patientIdentifier: string,
  testName: string,
  allTestsAndPanels: Array<LabTest>,
) {
  const loggedInUser = localStorage.getItem(loggedInUserKey)
  const auditMessage = getPayloadForViewingPatientReport(
    loggedInUser,
    patientUuid,
    getPatientIdentifier(patientIdentifier),
    fileName,
    reportDate,
    getShortName(testName, allTestsAndPanels),
  )
  return auditMessage
}

function postAuditMessage(auditMessage: AuditMessage) {
  const loggedInUser = localStorage.getItem(loggedInUserKey)
  const isAuditLogEnabled = localStorage.getItem(isAuditLogEnabledKey)
  if (loggedInUser && isAuditLogEnabled) {
    const ac = new AbortController()
    postApiCall(auditLogURL, auditMessage, ac)
  }
}

function getReportTableRowIndex(currentPage: number, index: number) {
  return defaultPageSize * (currentPage - 1) + index
}

export default ReportTable
