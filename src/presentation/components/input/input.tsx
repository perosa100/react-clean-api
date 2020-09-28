/* eslint-disable @typescript-eslint/indent */
import Context from '@/presentation/contexts/form/form-context'
import React, { useContext, useRef } from 'react'
import Styles from './input-styles.scss'
type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)
  const error = state[`${props.name}Error`]
  const inputRef = useRef<HTMLInputElement>()
  return (
    <div
      className={Styles.inputWrap}
      data-status={error ? 'invalid' : 'valid'}
      data-testid={`${props.name}-wrap`}
    >
      <input
        {...props}
        ref={inputRef}
        placeholder=""
        data-testid={props.name}
        readOnly
        title={error}
        onFocus={(e) => {
          e.target.readOnly = false
        }}
        onChange={(e) => {
          setState({
            ...state,
            [e.target.name]: e.target.value
          })
        }}
      />
      <label
        data-testid={`${props.name}-label`}
        title={error}
        onClick={() => {
          inputRef.current.focus()
        }}
      >
        {props.placeholder}
      </label>
      <span
        data-testid={`${props.name}-status`}
        title={error || 'Tudo certo'}
        className={Styles.status}
      >
        {error ? '🔴' : '🟢'}
      </span>
    </div>
  )
}

export default Input
