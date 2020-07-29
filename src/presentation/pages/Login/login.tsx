import {
  Footer,
  FormStatus,
  Input,
  LoginHeader
} from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import React, { useState } from 'react'
import Styles from './login-styles.scss'

type StateProps = {
  isLoading: boolean
  errorMessage: string
}

const Login: React.FC = () => {
  const [state] = useState<StateProps>({
    isLoading: false,
    errorMessage: ''
  })

  return (
    <div className={Styles.login}>

      <LoginHeader />
      <Context.Provider value={state}>
        <form action="" className={Styles.form}>

          <h2>Login</h2>

          < Input type="email" name="email" placeholder="Digite seu e-mail" />
          < Input type="password" name="password" placeholder="Digite sua senha" />

          <button className={Styles.submit} type="submit">Entrar</button>

          <span className={Styles.link}>Cadastre-se</span>
          < FormStatus />
        </form>
      </Context.Provider>
      < Footer />
    </div>
  )
}

export default Login