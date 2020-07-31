import { RequiredFieldError } from '@/validation/errors'
import faker from 'faker'
import { RequireFieldValidation } from './required-field-validation'

describe('RequireFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const sut = new RequireFieldValidation('email')
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })

  test('Should return falsy if field is not empty', () => {
    const sut = new RequireFieldValidation('email')
    const error = sut.validate(faker.random.word())
    expect(error).toBeFalsy()
  })
})
