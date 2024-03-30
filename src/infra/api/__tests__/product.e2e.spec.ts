import request from 'supertest'
import { faker } from '@faker-js/faker'
import { InputCreateProductDto } from '../../../usecase/product/create/create-product.dto'
import { app, sequelize } from '../express'
import e from 'express'

const makeInputCreateProductDto = (): InputCreateProductDto => ({
  name: faker.commerce.productName(),
  price: faker.number.float(),
})

describe('Product E2E', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const input = makeInputCreateProductDto()
    const response = await request(app).post('/products').send(input)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({ id: expect.any(String), ...input })
  })

  it.each([
    {},
    { name: faker.commerce.productName() },
    { price: faker.number.float() },
  ])(
    'should not create a product when invalid params are provided',
    async params => {
      const response = await request(app).post('/products').send(params)
      expect(response.status).toBe(400)
    }
  )

  it('should list all products', async () => {
    const firstProduct = makeInputCreateProductDto()
    const secondProduct = makeInputCreateProductDto()

    await request(app).post('/products').send(firstProduct)
    await request(app).post('/products').send(secondProduct)

    const response = await request(app).get('/products').send()
    const expectedProducts = [
      { id: expect.any(String), ...firstProduct },
      { id: expect.any(String), ...secondProduct },
    ]

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ products: expectedProducts })
  })

  it('should return an empty list when there are no products', async () => {
    const response = await request(app).get('/products').send()
    expect(response.status).toBe(200)
    expect(response.body).toEqual({ products: [] })
  })

  it('should find a product by id', async () => {
    const firstProduct = makeInputCreateProductDto()
    const secondProduct = makeInputCreateProductDto()

    await request(app).post('/products').send(firstProduct)
    await request(app).post('/products').send(secondProduct)
    const response = await request(app).get('/products').send()
    const productId = response.body.products[0].id

    const findResponse = await request(app).get(`/products/${productId}`).send()
    expect(findResponse.status).toBe(200)
    expect(findResponse.body).toEqual({ id: productId, ...firstProduct })
  })

  it('should return 404 when product is not found', async () => {
    const response = await request(app).get('/products/1').send()
    expect(response.status).toBe(404)
  })

  it('should update a product', async () => {
    const firstProduct = makeInputCreateProductDto()
    const secondProduct = makeInputCreateProductDto()

    await request(app).post('/products').send(firstProduct)
    const response = await request(app).get('/products').send()
    const productId = response.body.products[0].id

    const updateResponse = await request(app)
      .put(`/products/${productId}`)
      .send(secondProduct)
    expect(updateResponse.status).toBe(200)
    expect(updateResponse.body).toEqual({ id: productId, ...secondProduct })
  })

  it('should not update a product that does not exist', async () => {
    const response = await request(app).put('/products/1').send({})
    expect(response.status).toBe(404)
  })
})
