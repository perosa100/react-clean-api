import { AuthorizeHttpGetClientDecorator } from '@/main/decorators'
import { GetStorageSpy, mockGetRequest } from '@/data/test'

describe('AuthorizeHttpGetClientDecorator', () => {
  test('should call getStorage with correct value', () => {
    const getStorageSpy = new GetStorageSpy()
    const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy)
    sut.get(mockGetRequest())
    expect(getStorageSpy.key).toBe('account')
  })
})
