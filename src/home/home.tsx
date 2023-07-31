import {getCurrentUser, LoggedInUser} from '@openmrs/esm-framework'
import React, {useEffect, useState} from 'react'
import useSWR from 'swr'
import BahmniLogo from '../assets/bahmniLogoFull.png'
import {
  auditLogGlobalPropertyURL,
  auditLogURL,
  swrOptions,
  fetcher,
  getPayloadForUserLogin,
  postApiCall,
} from '../utils/api-utils'
import {isAuditLogEnabledKey, loggedInUserKey} from '../utils/constants'
import classes from './home.scss'
interface AuditLogResponse {
  data: boolean
}
const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null)

  let {data: auditLogEnabledResponse, error: auditLogResponseError} = useSWR<
    AuditLogResponse,
    Error
  >(auditLogGlobalPropertyURL, fetcher, swrOptions)

  useEffect(() => {
    const subscription = getCurrentUser({
      includeAuthStatus: false,
    }).subscribe(setLoggedInUser)
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (auditLogEnabledResponse?.data && loggedInUser) {
      const ac = new AbortController()
      const auditMessagePayload = getPayloadForUserLogin(loggedInUser.username)
      postApiCall(auditLogURL, auditMessagePayload, ac)
      localStorage.setItem(loggedInUserKey, loggedInUser.username)
      localStorage.setItem(isAuditLogEnabledKey, 'true')
    }
  }, [auditLogEnabledResponse, loggedInUser])

  return (
    <div className={classes.homeContainer}>
      <div className={classes.image}>
        <img src={BahmniLogo} alt="Bahmni Logo" />
      </div>
      <h1 className={classes.welcomeText}>WELCOME TO LAB ENTRY</h1>
      <span className={classes.helpText}>
        Please click on the search icon above to get started
      </span>
    </div>
  )
}

export default Home
