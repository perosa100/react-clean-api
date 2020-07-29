import { HttpPostClient, HttpPostParams } from '@/data/protocols/http/http-post-client'
import { httpResponse, HttpStatusCode } from '@/data/protocols/http/http-response'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: object
  response: httpResponse ={
    statusCode: HttpStatusCode.noContent
  }

  async post (params: HttpPostParams): Promise<httpResponse> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve(this.response)
  }
}
