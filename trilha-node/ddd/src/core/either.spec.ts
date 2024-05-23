import { Either, left, right } from './either'

function doSomething(x: boolean): Either<string, string> {
  if (x) {
    return right('success')
  } else {
    return left('error')
  }
}

describe('success result', () => {
  test('success result', () => {
    const success = doSomething(true)
    expect(success.isRight).toBeTruthy()
  })
  test('error result', () => {
    const error = doSomething(false)
    expect(error.isLeft).toBeTruthy()
  })
})
