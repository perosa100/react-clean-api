import { mockAccountModel } from './../../domain/test/mock-account'
import { AddAccont, AddAccountParams } from '@/domain/usecases/add-account'
import { AccountModel } from '@/domain/models'

export class AddAccountSpy implements AddAccont {
  accout = mockAccountModel()
  params: AddAccountParams

  async add (params: AddAccountParams): Promise<AccountModel> {
    this.params = params
    return this.accout
  }
}
