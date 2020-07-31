import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'

const makeSut = (): MinLengthValidation => new MinLengthValidation('field', 5)

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const sut = makeSut()
    const error = sut.validate('123')
    expect(error).toEqual(new InvalidFieldError())
  })
})
