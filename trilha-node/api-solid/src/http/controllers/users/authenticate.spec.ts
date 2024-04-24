import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate e2e', () => {
  beforeAll(async () => await app.ready())
  afterAll(async () => await app.close())
  it('should be able to register', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '1234567',
    })
    const response = await request(app.server).post('/sessions').send({
      email: 'john.doe@gmail.com',
      password: '1234567',
    })
    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
