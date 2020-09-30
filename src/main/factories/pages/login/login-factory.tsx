import { makeRemoteAuthentication } from '@/main/usecases/add-account/remote-authentication-factory'
import { makeLocalUpdateCurrentAccount } from '@/main/usecases/update-current-account/update-current-account-factory'
import { Login } from '@/presentation/pages'
import React from 'react'
import { makeLoginValidation } from './login-validation-factory'

export const makeLogin: React.FC = () => {
  return (
    <Login
      updateCurrentAccount={makeLocalUpdateCurrentAccount()}
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  )
}
