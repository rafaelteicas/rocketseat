import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Create Gym e2e', () => {
  it('', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Javascript Gym',
        description: 'Some description',
        phone: '19191911',
        latitude: -27.2902929,
        longitude: -48.2902929,
      })

    expect(response.statusCode).toEqual(201)
  })
})
