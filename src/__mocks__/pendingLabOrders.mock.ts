import {LabOrdersFetchResponse} from '../types'

export const mockPendingLabOrdersResponse: LabOrdersFetchResponse = {
  data: [
    {
      concept: {
        name: 'Routine Blood',
        uuid: '07a128f7-f596-45d5-a2a9-c447bc9e5112',
      },
      orderDate: 1657188240000,
      orderUuid: 'abc-123',
      provider: 'Super Man',
      providerUuid: '1',
      fulfillerStatus: null,
    },
    {
      concept: {
        name: 'Anaemia Panel',
        uuid: '5b0cdc41-7371-4c2f-a1e4-ed1bf7416a8d',
      },
      orderDate: 1657187934000,
      orderUuid: 'abd-123',
      provider: 'Super Man',
      providerUuid: '2',
      fulfillerStatus: null,
    },
    {
      concept: {
        name: 'Dummy Test',
        uuid: '1643AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      },
      orderDate: 1657186534000,
      orderUuid: 'abe-123',
      provider: 'Super Man',
      providerUuid: '2',
      fulfillerStatus: null,
    },
    {
      concept: {
        name: 'Haemoglobin',
        uuid: '21AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      },
      orderDate: 1657188834000,
      orderUuid: 'abf-123',
      provider: 'Super Man',
      providerUuid: '2',
      fulfillerStatus: null,
    },
  ],
}

export const mockPendingLabOrdersErrorResponse = {
  message: 'Data not found',
  response: {
    status: 404,
    statusText: 'Not Found',
  },
}
export const mockEmptyPendingLabOrderResponse = {
  data: [],
}
