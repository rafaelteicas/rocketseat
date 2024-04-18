import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let userRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(userRepository)
  })

  it('should be able to authenticate', async () => {
    await userRepository.create({
      email: 'john@mail.com',
      name: 'John',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'john@mail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const promise = sut.execute({
      email: 'john@mail.com',
      password: '123456',
    })

    expect(promise).rejects.toThrow(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await userRepository.create({
      email: 'john@mail.com',
      name: 'John',
      password_hash: await hash('123456', 6),
    })

    const promise = sut.execute({
      email: 'john@mail.com',
      password: '12345678',
    })

    expect(promise).rejects.toThrow(InvalidCredentialsError)
  })
})
