import React from 'react'
import { render } from '@testing-library/react'
import PrivateRoute from './private-route'
import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'

type SutType = {
  history: MemoryHistory
}
const makeSut = (): SutType => {
  const history = createMemoryHistory({ initialEntries: ['/'] })

  render(
    <Router history={history}>
      <PrivateRoute />
    </Router>
  )
  return { history }
}
describe('PrivateRoute', () => {
  test('should redirect to /login if token is empty', () => {
    const { history } = makeSut()
    expect(history.location.pathname).toBe('/login')
  })
})
