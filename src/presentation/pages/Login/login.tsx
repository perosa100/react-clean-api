import Spinner from '@/presentation/components/spinner/spinner'
import React from 'react'
import Logo from '../../components/logo/logo'
import Styles from './login-styles.scss'
const Login: React.FC = () => {
  return <div className={Styles.login}>
    <header className={Styles.header}>
      <h1>4Dev - Enquente para Programadores</h1>
    </header>

    <form action="" className={Styles.form}>
      <Logo />
      <h2>Login</h2>
      <div className={Styles.inputWrap}>
        <input type="email" name="email" placeholder="Digite seu e-mail" />
        <span className={Styles.status}>🔴</span>

      </div>

      <div className={Styles.inputWrap}>
        <input type="password" name="password" placeholder="Digite sua senha" />
        <span className={Styles.status}>🔴</span>
      </div>
      <button className={Styles.submit} type="submit">Entrar</button>
      <span className={Styles.link}>Cadastre-se</span>
      <div className={Styles.errorWrap}>
        <Spinner className={Styles.spinner}/>
        <span className={Styles.error}> ERRORORORORORO</span>
      </div>

    </form>

    <footer className={Styles.footer}></footer>
  </div>
}

export default Login
