import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      email: 'john@mail.com',
      name: 'name',
      password: '12345678',
    })
    const isPasswordHash = await compare('12345678', user.password_hash)
    expect(isPasswordHash).toBeTruthy()
  })

  it('should not be able to register with same e-mail twice', async () => {
    await sut.execute({
      email: 'john@mail.com',
      name: 'name',
      password: '12345678',
    })

    await expect(async () =>
      sut.execute({
        email: 'john@mail.com',
        name: 'name',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      email: 'john@mail.com',
      name: 'name',
      password: '12345678',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
