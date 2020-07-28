import { HttpPostClient } from 'data/protocols/http/http-post-client'
import { RemoteAuthentication } from './remote-authentication'

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    // cria valores fakes e variaveis fake
    class HttpPostClientSpy implements HttpPostClient {
      url?: string
      async post (url: string): Promise<void> {
        this.url = url
        return Promise.resolve()
      }
    }
    const url = 'any_url'
    const httpPostClientSpy = new HttpPostClientSpy()
    // sut é o que é testando em si
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    await sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
