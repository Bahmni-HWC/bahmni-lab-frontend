import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import {SWRConfig} from 'swr'
import {
  labEntryHomePath,
  patientLabDetailsRoute,
  privilegeLabLite,
  spaRoot,
} from '../utils/constants'
import Home from '../home/home'
import {UnauthorisedResponse} from '../common/unauthorized-response/unauthorised-response'
import PatientLabDetails from './patient-lab-details/patient-lab-details'
import {UserHasAccess} from '@openmrs/esm-framework'

const swrConfiguration = {
  // Maximum number of retries when the backend returns an error
  errorRetryCount: 3,
  revalidateOnFocus: false,
}

const Root: React.FC = () => {
  return (
    <UserHasAccess
      privilege={privilegeLabLite}
      fallback={<UnauthorisedResponse />}
    >
      <main>
        <SWRConfig value={swrConfiguration}>
          <BrowserRouter basename={spaRoot}>
            <Route exact path={labEntryHomePath} component={Home} />
            <Route
              exact
              path={patientLabDetailsRoute}
              component={PatientLabDetails}
            />
          </BrowserRouter>
        </SWRConfig>
      </main>
    </UserHasAccess>
  )
}

export default Root
