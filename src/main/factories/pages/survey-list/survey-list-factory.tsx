import { SurveyList } from '@/presentation/pages'
import React from 'react'
import { makeRemoteLoadSurveyList } from '@/main/usecases/load-survey-list/remote-survey-list-factory'

export const makeSurveyList: React.FC = () => {
  return <SurveyList loadSurveyList={makeRemoteLoadSurveyList()} />
}
