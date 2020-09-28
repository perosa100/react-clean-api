import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { AddAccont, AddAccountParams } from '@/domain/usecases/add-account'
import { AccountModel } from '@/domain/models'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { HttpStatusCode } from '@/data/protocols/http'

export class RemoteAddAccount implements AddAccont {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient< AccountModel>
  ) {}

  async add (params: AddAccountParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.forbidden: throw new EmailInUseError()
      default: throw new UnexpectedError()
    }
  }
}
