import { UnexpectedError } from '@/domain/errors'
import { SetStorage } from '@/data/protocols/cache/set-storage'
import { UpdateCurrentAccount } from '@/domain/usecases/update-current-account'
import { AccountModel } from '@/domain/models'

export default class LocalUpdateCurrentAccount implements UpdateCurrentAccount {
  constructor(private readonly setStorage: SetStorage) {}

  async save(account: AccountModel): Promise<void> {
    if (!account?.accessToken) {
      throw new UnexpectedError()
    }
    this.setStorage.set('account', JSON.stringify(account))
  }
}
