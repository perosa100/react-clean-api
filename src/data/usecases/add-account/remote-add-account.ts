import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { AddAccont, AddAccountParams } from '@/domain/usecases/add-account'
import { AccountModel } from '@/domain/models'

export class RemoteAddAccount implements AddAccont {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AddAccountParams, AccountModel>
  ) {}

  async add (params: AddAccountParams): Promise<AccountModel> {
    await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    return null
  }
}
