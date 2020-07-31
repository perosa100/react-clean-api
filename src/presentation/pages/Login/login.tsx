import { Authentication } from '@/domain/usecases'
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader
} from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import React, { useEffect, useState } from 'react'
import Styles from './login-styles.scss'

type Props ={
  validation: Validation
  authentication: Authentication
}
const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      passwordError: validation.validate('password', state.password),
      emailError: validation.validate('email', state.email)
    })
  }, [state.password, state.email])

  const handleSubit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (state.isLoading) {
      return
    }
    setState({
      ...state,
      isLoading: true
    })
    await authentication.auth({ email: state.email, password: state.password })
  }
  return (
    <div className={Styles.login}>

      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form} onSubmit={handleSubit}>

          <h2>Login</h2>

          < Input type="email" name="email" placeholder="Digite seu e-mail" />
          < Input type="password" name="password" placeholder="Digite sua senha" />

          <button data-testid="submit" disabled={!!state.emailError || !!state.passwordError} className={Styles.submit} type="submit">Entrar</button>

          <span className={Styles.link}>Cadastre-se</span>
          < FormStatus />
        </form>
      </Context.Provider>
      < Footer />
    </div>
  )
}

export default Login
