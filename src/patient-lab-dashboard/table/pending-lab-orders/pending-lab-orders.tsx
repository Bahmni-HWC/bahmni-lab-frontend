import {usePagination} from '@openmrs/esm-framework'
import {PatientChartPagination} from '@openmrs/esm-patient-common-lib'
import {
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectAll,
  TableSelectRow,
  TableSelectRowProps,
} from 'carbon-components-react'
import React, {useEffect, useMemo, useState} from 'react'
import useSWR, {mutate} from 'swr'
import {usePendingLabOrderContext} from '../../../context/pending-orders-context'
import {useOrderTypeUuidConfig} from '../../../hooks/useOrderTypeUuidConfig'
import {
  LabOrdersFetchResponse,
  PendingLabOrders as PendingLabOrdersTable,
} from '../../../types'
import {fetcher, getPendingLabOrdersURL} from '../../../utils/api-utils'
import {
  defaultPageSize,
  headers,
  orderStatusCompleted,
} from '../../../utils/constants'

const PendingLabOrdersTable = ({
  patientUuid,
  onButtonClick,
  onEnterResultButtonClick,
  reloadTableData,
}) => {
  const {orderTypeUuidConfig} = useOrderTypeUuidConfig()
  const pendingOrderUrl = getPendingLabOrdersURL(
    patientUuid,
    orderTypeUuidConfig,
  )

  const {data: pendingLabOrders, error: pendingLabOrderDataError} = useSWR<
    LabOrdersFetchResponse,
    Error
  >(getPendingLabOrdersURL(patientUuid, orderTypeUuidConfig), fetcher)

  const {
    selectedPendingOrder,
    setSelectedPendingOrder,
  } = usePendingLabOrderContext()

  const [selectAll, setSelectAll] = useState<boolean>(false)

  function filterPendingLabOrders(
    pendingLabOrders: LabOrdersFetchResponse,
  ): Array<PendingLabOrdersTable> {
    return pendingLabOrders?.data
      ?.filter(
        pendingLabOrderRow =>
          pendingLabOrderRow.fulfillerStatus != orderStatusCompleted,
      )
      .map(pendingLabOrderRow => {
        return {
          id: pendingLabOrderRow.orderUuid,
          testName: pendingLabOrderRow.concept.shortName,
          date: new Date(pendingLabOrderRow.orderDate).toLocaleDateString(
            localStorage.getItem('i18nextLng'),
            {
              year: 'numeric',
              month: 'long',
              day: '2-digit',
            },
          ),
          orderedBy: pendingLabOrderRow.provider,
          providerUuid: pendingLabOrderRow.providerUuid,
          conceptUuid: pendingLabOrderRow.concept.uuid,
        }
      })
  }
  const pendingLabOrderRows = useMemo(
    () => filterPendingLabOrders(pendingLabOrders),
    [pendingLabOrders],
  )

  useEffect(() => {
    if (reloadTableData) {
      mutate(pendingOrderUrl)
    }
  }, [reloadTableData, pendingOrderUrl])

  const {results: paginatedPendingLabOrders, goTo, currentPage} = usePagination(
    pendingLabOrderRows,
    defaultPageSize,
  )

  useEffect(() => {
    if (selectAll) {
      setSelectedPendingOrder([...pendingLabOrderRows])
    } else {
      setSelectedPendingOrder([])
    }
  }, [selectAll])

  return (
    <div title="paginated-table">
      {pendingLabOrderDataError ? (
        <div>Something went wrong in fetching pending lab orders...</div>
      ) : (
        pendingLabOrderRows?.length > 0 && (
          <>
            <h4>Pending Lab Orders</h4>
            <DataTable rows={paginatedPendingLabOrders} headers={headers}>
              {({
                rows: dataTableRows,
                headers,
                getSelectionProps,
                getHeaderProps,
              }) => (
                <Table title="lab-order-table" useZebraStyles={true}>
                  <TableHead>
                    <TableRow>
                      <TableHeader></TableHeader>
                      {headers.map(header => (
                        <TableHeader {...getHeaderProps({header})}>
                          {header.header}
                        </TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataTableRows.map(row => (
                      <TableRow key={row.id}>
                        <TableSelectRow
                          {...getSelectionProps({row})}
                          onChange={selected => {
                            const currentRow = pendingLabOrderRows.filter(
                              intialRow => intialRow.id === row.id,
                            )[0]
                            if (selected) {
                              setSelectedPendingOrder([currentRow])
                            } else {
                              setSelectedPendingOrder([])
                            }
                          }}
                          disabled={onButtonClick || onEnterResultButtonClick}
                          checked={isChecked(row)}
                        />
                        {row.cells.map(cell => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </DataTable>
            <PatientChartPagination
              pageNumber={currentPage}
              pageSize={defaultPageSize}
              currentItems={paginatedPendingLabOrders?.length}
              totalItems={pendingLabOrderRows?.length}
              onPageNumberChange={({page}) => {
                goTo(page)
              }}
            />
          </>
        )
      )}
    </div>
  )

  function isChecked(row: TableSelectRowProps): boolean {
    return (
      selectedPendingOrder.length === 1 && selectedPendingOrder[0].id === row.id
    )
  }
}

export default PendingLabOrdersTable
