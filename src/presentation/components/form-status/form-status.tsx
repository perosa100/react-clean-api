import Spinner from '@/presentation/components/spinner/spinner'
import React, { useContext } from 'react'
import Context from '../../contexts/form/form-context'
import Styles from './form-status-styles.scss'

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(Context)

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} /> }
      {errorMessage && <span className={Styles.error}> {errorMessage}</span> }
    </div>
  )
}

export default FormStatus
