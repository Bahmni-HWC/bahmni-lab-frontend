import AddFilled16 from '@carbon/icons-react/lib/add/16'
import {ExtensionSlot, usePatient} from '@openmrs/esm-framework'
import {
  Button,
  Column,
  Grid,
  InlineNotification,
  NotificationKind,
  Row,
  ToastNotification,
} from 'carbon-components-react'
import React, {useEffect, useState} from 'react'
import {RouteComponentProps} from 'react-router-dom'
import Loader from '../../common/loader/loader.component'
import {usePendingLabOrderContext} from '../../context/pending-orders-context'
import {UploadReportProvider} from '../../context/upload-report-context'
import {
  auditLogURL,
  fetcher,
  getPayloadForPatientAccess,
  postApiCall,
  swrOptions,
} from '../../utils/api-utils'
import {
  failureMessage,
  isAuditLogEnabledKey,
  loggedInUserKey,
  successMessage,
} from '../../utils/constants'
import PendingLabOrdersTable from '../table/pending-lab-orders/pending-lab-orders'
import ReportTable from '../table/report-table/report-table.component'
import UploadReport from '../upload-report/upload-report'
import styles from './patient-lab-details.scss'
import TestResults from '../test-results/test-results'
import useSWR from 'swr'
import {getLabConfig} from '../../utils/lab-orders'
import {LabConfigResponse} from '../../types'

interface PatientParamsType {
  patientUuid: string
}

const PatientLabDetails: React.FC<RouteComponentProps<PatientParamsType>> = ({
  match,
}) => {
  const {patientUuid} = match.params
  const {isLoading, patient, error} = usePatient(patientUuid)
  const [onButtonClick, setOnButtonClick] = useState<boolean>(false)
  const [onSaveSuccess, setOnSaveSuccess] = useState<boolean>(false)
  const [onSaveFailure, setOnSaveFailure] = useState<boolean>(false)
  const [reloadReportTable, setReloadReportTable] = useState<boolean>(false)
  const [onEnterResultButtonClick, setOnEnterResultButtonClick] = useState<
    boolean
  >(false)
  const {selectedPendingOrder} = usePendingLabOrderContext()
  const [duplicateOrder, setDuplicateOrder] = useState<boolean>(false)

  const handleClick = () => {
    setOnButtonClick(true)
    setOnSaveSuccess(false)
    setReloadReportTable(false)
    setOnSaveFailure(false)
  }
  const enterResultsHandleClick = () => {
    setOnEnterResultButtonClick(true)
    setOnSaveSuccess(false)
    setReloadReportTable(false)
    setOnSaveFailure(false)
  }
  const enterResultsHandleClose = () => {
    setOnEnterResultButtonClick(false)
  }
  const handleClose = () => {
    setOnButtonClick(false)
  }

  const handleUploadAndSave = (isSaveSuccess: boolean) => {
    setOnButtonClick(false)
    setOnEnterResultButtonClick(false)
    setOnSaveSuccess(isSaveSuccess)
    setOnSaveFailure(!isSaveSuccess)
    setReloadReportTable(true)
  }

  const renderNotificationMessage = (
    kind: NotificationKind,
    title: string,
    saveHandler: Function,
  ) => (
    <ToastNotification
      kind={kind}
      lowContrast={true}
      title={title}
      timeout={5000}
      onClose={() => {
        saveHandler(false)
        return true
      }}
    />
  )
  const {data: labConfig, error: labConfigError} = useSWR<
    LabConfigResponse,
    Error
  >(getLabConfig, fetcher, swrOptions)

  useEffect(() => {
    const loggedInUser = localStorage.getItem(loggedInUserKey)
    const isAuditLogEnabled = localStorage.getItem(isAuditLogEnabledKey)

    if (isAuditLogEnabled && loggedInUser && patient) {
      const patientIdentifier = patient?.identifier?.filter(
        identifier => identifier.type.text == 'Patient Identifier',
      )[0]
      const ac = new AbortController()
      const auditMessagePayload = getPayloadForPatientAccess(
        loggedInUser,
        patientUuid,
        patientIdentifier?.value,
      )
      postApiCall(auditLogURL, auditMessagePayload, ac)
    }
  }, [patient])

  useEffect(() => {
    setDuplicateOrder(selectedPendingOrder?.length > 0 && checkDuplicateOrder())
  }, [selectedPendingOrder])

  const checkDuplicateOrder = () => {
    const conceptUUIDs = new Set()
    for (const order of selectedPendingOrder) {
      if (conceptUUIDs.has(order.conceptUuid)) {
        console.log('ghjk')
        return true
      }
      conceptUUIDs.add(order.conceptUuid)
    }
    return false
  }

  return (
    <main>
      {isLoading ? (
        <Loader />
      ) : error || labConfigError ? (
        <div>Something went wrong: {error.message}</div>
      ) : (
        <Grid style={{padding: '1rem'}}>
          <Column
            style={{padding: '0'}}
            sm={4}
            lg={onButtonClick || onEnterResultButtonClick ? 8 : 16}
          >
            <Grid style={{padding: '0', marginBottom: '3rem'}}>
              <Row>
                <Column sm={4} lg={9}>
                  <ExtensionSlot
                    extensionSlotName="patient-header-slot"
                    state={{
                      patient,
                      patientUuid: patient.id,
                      hideActionsOverflow: true,
                    }}
                  />
                </Column>
                <Column lg={3}>
                  {onSaveSuccess &&
                    renderNotificationMessage(
                      'success',
                      successMessage,
                      setOnSaveSuccess,
                    )}
                  {onSaveFailure &&
                    renderNotificationMessage(
                      'error',
                      failureMessage,
                      setOnSaveFailure,
                    )}
                </Column>
              </Row>
            </Grid>
            {duplicateOrder && (
              <InlineNotification
                kind="error"
                title="Duplicate Order"
                subtitle="You have selected duplicate orders. Please select unique orders."
                lowContrast={true}
              />
            )}
            <div style={{paddingBottom: '2rem'}}>
              <PendingLabOrdersTable
                patientUuid={patientUuid}
                onButtonClick={onButtonClick}
                onEnterResultButtonClick={onEnterResultButtonClick}
                reloadTableData={reloadReportTable}
              />
            </div>
            <div style={{float: 'right'}} className={styles.flexContainer}>
              <Button
                renderIcon={AddFilled16}
                onClick={handleClick}
                style={{margin: '0%'}}
                disabled={duplicateOrder}
              >
                Upload Report
              </Button>
              {onButtonClick && (
                <UploadReportProvider>
                  <UploadReport
                    saveHandler={(isSaveSuccess = false) =>
                      handleUploadAndSave(isSaveSuccess)
                    }
                    closeHandler={() => handleClose()}
                    header="Upload Report"
                    patientUuid={patientUuid}
                  />
                </UploadReportProvider>
              )}
              {labConfig?.data?.labLite.captureTestResults && (
                <Button
                  disabled={selectedPendingOrder?.length == 0 || duplicateOrder}
                  renderIcon={AddFilled16}
                  onClick={enterResultsHandleClick}
                >
                  Enter Test Results
                </Button>
              )}
              {onEnterResultButtonClick && (
                <UploadReportProvider>
                  <TestResults
                    saveHandler={(isSaveSuccess = false) => {
                      handleUploadAndSave(isSaveSuccess)
                    }}
                    closeHandler={() => enterResultsHandleClose()}
                    header="Enter Test Results"
                    patientUuid={patientUuid}
                  />
                </UploadReportProvider>
              )}
            </div>
            <div style={{marginTop: '2rem', marginBottom: '2rem'}}>
              <ReportTable
                patientUuid={patientUuid}
                reloadTableData={reloadReportTable}
              />
            </div>
          </Column>
        </Grid>
      )}
    </main>
  )
}

export default PatientLabDetails
