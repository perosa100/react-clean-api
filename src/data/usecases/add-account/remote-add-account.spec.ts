import { AddAccountParams } from '@/domain/usecases/add-account'
import { HttpPostClientSpy } from '@/data/test'
import { AccountModel } from '@/domain/models'
import { AuthenticationParams } from '@/domain/usecases'
import faker from 'faker'
import { RemoteAddAccount } from './remote-add-account'
import { mockAddAccountParams } from '@/domain/test'

type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
}

// cria valores fakes e variaveis fake
const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AddAccountParams, AccountModel>()
  // sut é o que é testando em si
  const sut = new RemoteAddAccount(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAddAccount', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.add(mockAddAccountParams())
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const addAccountParamsParams = mockAddAccountParams()
    await sut.add(addAccountParamsParams)
    expect(httpPostClientSpy.body).toEqual(addAccountParamsParams)
  })
})
