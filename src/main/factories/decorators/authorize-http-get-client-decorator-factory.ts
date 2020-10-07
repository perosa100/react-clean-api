import { AuthorizeHttpGetClientDecorator } from '@/main/decorators/authorize-http-get-client-decorator/authorize-http-get-client-decorator'
import { HttpGetClient } from '@/data/protocols/http'
import { makeLocalStorageAdapter } from '@/main/factories/cache/local-storage-adapter-factory'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'

export const makeAuthorizeHttpGetClientDecorator = (): HttpGetClient => {
  return new AuthorizeHttpGetClientDecorator(
    makeLocalStorageAdapter(),
    makeAxiosHttpClient()
  )
}
