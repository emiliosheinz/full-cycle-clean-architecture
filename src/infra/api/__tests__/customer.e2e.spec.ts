import request from 'supertest'
import { app, sequelize } from '../express'
import { faker } from '@faker-js/faker'
import { InputCreateCustomerDto } from '../../../usecase/customer/create/create-customer.dto'

const makeInputCreateCustomerDto = (): InputCreateCustomerDto => ({
  name: faker.person.fullName(),
  address: {
    street: faker.location.street(),
    number: faker.number.int(),
    city: faker.location.city(),
    state: faker.location.state(),
    zip: faker.location.zipCode(),
  },
})

describe('Customer E2E', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a customer', async () => {
    const params = makeInputCreateCustomerDto()

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

  it('should list all customers in json', async () => {
    const firstCustomer = makeInputCreateCustomerDto()
    const secondCustomer = makeInputCreateCustomerDto()

    await request(app).post('/customers').send(firstCustomer)
    await request(app).post('/customers').send(secondCustomer)

    const response = await request(app).get('/customers').send()
    const expectedCustomers = [
      { id: expect.any(String), ...firstCustomer },
      { id: expect.any(String), ...secondCustomer },
    ]

    expect(response.status).toBe(200)
    expect(response.body.customers.length).toBe(2)
    expect(response.body.customers).toEqual(expectedCustomers)
  })

  it('should list all customers in xml', async () => {
    const customer = makeInputCreateCustomerDto()

    await request(app).post('/customers').send(customer)

    const response = await request(app)
      .get('/customers')
      .set('Accept', 'application/xml')
      .send()

    expect(response.status).toBe(200)
    expect(response.text).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(response.text).toContain('<customers>')
    expect(response.text).toContain('<customer>')
    expect(response.text).toContain(`<name>${customer.name}</name>`)
    expect(response.text).toContain('<address>')
    expect(response.text).toContain(
      `<street>${customer.address.street}</street>`
    )
    expect(response.text).toContain(
      `<number>${customer.address.number}</number>`
    )
    expect(response.text).toContain(`<city>${customer.address.city}</city>`)
    expect(response.text).toContain(`<zip>${customer.address.zip}</zip>`)
    expect(response.text).toContain('</address>')
    expect(response.text).toContain('</customer>')
    expect(response.text).toContain('</customers>')
  })
})
