import {openmrsFetch} from '@openmrs/esm-framework'
import {render, screen, waitFor} from '@testing-library/react'
import React from 'react'
import {of} from 'rxjs'
import {SWRConfig} from 'swr'
import {
  auditLogGlobalPropertyURL,
  auditLogURL,
  getPayloadForUserLogin,
  activePatientWithLabOrdersURL,
} from '../utils/api-utils'
import {verifyApiCall} from '../utils/test-utils'
import {mockUser} from '../__mocks__/mockUser'
import Home from './home'

const mockUserObservable = of(mockUser)
jest.mock('@openmrs/esm-framework', () => ({
  openmrsFetch: jest.fn().mockResolvedValue({}),
  getCurrentUser: jest.fn(() => mockUserObservable),
  subscribeConnectivity: jest.fn(),
}))
describe('home page', () => {
  let mockedOpenmrsFetch = openmrsFetch as jest.Mock
  mockedOpenmrsFetch.mockReturnValueOnce({data: true})
  it('should show home page', () => {
    render(
      <SWRConfig value={{provider: () => new Map()}}>
        <Home />
      </SWRConfig>,
    )

    expect(screen.getByAltText(/Bahmni Logo/i)).toBeInTheDocument()
    expect(screen.getByText(/welcome to lab entry/i)).toBeInTheDocument()
    expect(
      screen.getByText(/please click on the search icon above to get started/i),
    ).toBeInTheDocument()
  })
})

describe('home page - Auditing', () => {
  let mockedOpenmrsFetch = openmrsFetch as jest.Mock
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('should update audit logs when user enters lab lite', async () => {
    mockedOpenmrsFetch.mockReturnValueOnce({data: true})

    render(
      <SWRConfig value={{provider: () => new Map()}}>
        <Home />
      </SWRConfig>,
    )
    await waitFor(() => expect(mockedOpenmrsFetch).toBeCalledTimes(2))

    const auditMessagePayload = getPayloadForUserLogin(mockUser.username)

    verifyApiCall(auditLogGlobalPropertyURL, 'GET')
    verifyApiCall(auditLogURL, 'POST', JSON.stringify(auditMessagePayload))
  })

  it('should not update audit logs when audit log property is disabled', async () => {
    mockedOpenmrsFetch.mockReturnValueOnce({data: false})

    render(
      <SWRConfig value={{provider: () => new Map()}}>
        <Home />
      </SWRConfig>,
    )

    await waitFor(() => expect(mockedOpenmrsFetch).toBeCalledTimes(2))

    verifyApiCall(auditLogGlobalPropertyURL, 'GET')
  })
  it('should fetch the active patients with laborders on load', async () => {
    const mockPatients = {
      data: [
        {identifier: 'Patient1', name: 'John Doe'},
        {identifier: 'Patient2', name: 'Jane Smith'},
      ],
    }
    mockedOpenmrsFetch.mockReturnValueOnce({data: true})

    render(
      <SWRConfig value={{provider: () => new Map()}}>
        <Home />
      </SWRConfig>,
    )
    await waitFor(() => {
      expect(mockedOpenmrsFetch).toHaveBeenCalled()
    })
    verifyApiCall(activePatientWithLabOrdersURL(undefined), 'GET')
  })
})
