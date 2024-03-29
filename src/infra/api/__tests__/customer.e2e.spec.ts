import request from 'supertest'
import { app, sequelize } from '../express'
import { faker } from '@faker-js/faker'

describe('Customer E2E', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a customer', async () => {
    const params = {
      name: faker.person.fullName(),
      address: {
        street: faker.location.street(),
        number: faker.number.int(),
        city: faker.location.city(),
        state: faker.location.state(),
        zip: faker.location.zipCode(),
      },
    }

    const response = await request(app).post('/customers').send(params)

    expect(response.status).toBe(200)
    expect(response.body.name).toBe(params.name)
    expect(response.body.address.street).toBe(params.address.street)
    expect(response.body.address.number).toBe(params.address.number)
    expect(response.body.address.city).toBe(params.address.city)
    expect(response.body.address.state).toBe(params.address.state)
    expect(response.body.address.zip).toBe(params.address.zip)
  })

  it('should not create a customer when only the name is provided', async () => {
    const params = { name: faker.person.fullName() }
    const response = await request(app).post('/customers').send(params)
    expect(response.status).toBe(400)
  })

  it('should not create a customer when no params are provided', async () => {
    const response = await request(app).post('/customers').send({})
    expect(response.status).toBe(400)
  })
})