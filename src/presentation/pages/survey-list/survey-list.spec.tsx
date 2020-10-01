import { SurveyModel } from '@/domain/models'
import { mockSurveyListModel } from '@/domain/test'
import { LoadSurveyList } from '@/domain/usecases'
import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import SurveyList from './survey-list'
import { UnexpectedError } from '@/domain/errors'

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0
  surveys = mockSurveyListModel()

  async loadAll(): Promise<SurveyModel[]> {
    this.callsCount++
    return this.surveys
  }
}
type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
}
const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />)
  return {
    loadSurveyListSpy
  }
}

describe('SurveyList Component', () => {
  test('should present 4 empty items on start', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()

    await waitFor(() => surveyList)
  })

  test('should call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSut()
    expect(loadSurveyListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getAllByRole('heading'))
  })

  test('should render SurveyItem on success', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    await waitFor(() => surveyList)
    expect(surveyList.querySelectorAll('li.surveyItemWrap')).toHaveLength(3)
  })

  test('should render error on failure', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    const errroMessage = new UnexpectedError()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(errroMessage)
    makeSut(loadSurveyListSpy)
    await waitFor(() => screen.getAllByRole('heading'))
    expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
    expect(screen.getByTestId('error')).toHaveTextContent(errroMessage.message)
  })
})
