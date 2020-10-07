import { GetStorage } from './../protocols/cache/get-storage'
import faker from 'faker'

export class GetStorageSpy implements GetStorage {
  key: string
  value = faker.random.objectElement()

  get(key: string): any {
    this.key = key
    return this.value
  }
}
