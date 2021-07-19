import Router from '../services/Router'
import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'

const HeaderSmall: FC = () => {
  return (
    <div className="header-wrapper-small">
      <Router />
    </div>
  )
}

export default observer(HeaderSmall)
