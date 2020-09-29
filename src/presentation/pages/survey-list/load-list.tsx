import { Footer, Logo } from '@/presentation/components'
import React from 'react'
import Styles from './survey-list-styles.scss'

const SurveyList: React.FC = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <header className={Styles.headerWrap}>
        <div className={Styles.headerContent}>
          <Logo />
          <div className={Styles.logoutWrap}>
            <span>Patrick</span>
            <a href="#">Sair</a>
          </div>
        </div>
      </header>

      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
          <li>
            <div className={Styles.surveyContent}>
              <time>
                <span className={Styles.day}>22</span>
                <span className={Styles.month}>08</span>
                <span className={Styles.year}>2020</span>
              </time>
              <p>Qual seu Frameword preferido?</p>
            </div>
            <footer>Ver Resultado</footer>
          </li>

          <li>
            <div className={Styles.surveyContent}>
              <time>
                <span className={Styles.day}>22</span>
                <span className={Styles.month}>08</span>
                <span className={Styles.year}>2020</span>
              </time>
              <p>Qual seu Frameword preferido?</p>
            </div>
            <footer>Ver Resultado</footer>
          </li>

          <li>
            <div className={Styles.surveyContent}>
              <time>
                <span className={Styles.day}>22</span>
                <span className={Styles.month}>08</span>
                <span className={Styles.year}>2020</span>
              </time>
              <p>Qual seu Frameword preferido?</p>
            </div>
            <footer>Ver Resultado</footer>
          </li>

          <li>
            <div className={Styles.surveyContent}>
              <time>
                <span className={Styles.day}>22</span>
                <span className={Styles.month}>08</span>
                <span className={Styles.year}>2020</span>
              </time>
              <p>Qual seu Frameword preferido?</p>
            </div>
            <footer>Ver Resultado</footer>
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList