import { makeRemoteAuthentication } from '@/main/usecases/add-account/remote-authentication-factory'
import { makeLocalSaveAccessToken } from '@/main/usecases/save-access-token/save-access-token-factory'
import { Login } from '@/presentation/pages'
import React from 'react'
import { makeLoginValidation } from './login-validation-factory'

export const makeLogin: React.FC = () => {
  return (
    <Login
      saveAccessToken={makeLocalSaveAccessToken()}
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  )
}
