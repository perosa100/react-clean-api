import { AddAccont } from '@/domain/usecases/add-account'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'
import { RemoteAddAccount } from '@/data/usecases/add-account/remote-add-account'

export const makeRemoteAddAccount = (): AddAccont => {
  return new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpClient())
}
