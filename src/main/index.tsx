import { Router } from '@/presentation/components'
import '@/presentation/styles/global.scss'
import React from 'react'
import ReactDom from 'react-dom'
import { makeLogin } from './factories/pages/login/login-factory'

ReactDom.render(
  <Router
    makeLogin={makeLogin}
  />,
  document.getElementById('main')
)
