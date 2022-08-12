import Home24 from '@carbon/icons-react/lib/home/24'
import {HeaderGlobalAction} from 'carbon-components-react'
import React from 'react'
import {homePath} from '../constants'
import styles from './home-button.scss'

const HomeButton = () => {
  return (
    <HeaderGlobalAction
      aria-label="Home"
      className={styles.headerGlobalBarButton}
      onClick={() => {
        window.location.href = homePath
      }}
    >
      <Home24 className={styles.home} />
    </HeaderGlobalAction>
  )
}

export default HomeButton
