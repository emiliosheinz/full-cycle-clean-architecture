import { faker } from '@faker-js/faker'
import { ProductRepository } from '../../../infra/product/repository/squelize/product.repository'
import { CreateProductUseCase } from './create-product.usecase'
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from './create-product.dto'
import { Sequelize } from 'sequelize-typescript'
import { ProductModel } from '../../../infra/product/repository/squelize/product.model'
import { setupSequelize } from '../../../test/utils'

setupSequelize([ProductModel])

describe('Create Product UseCase', () => {
  it('should create a product', async () => {
    const productRepository = new ProductRepository()
    const createProductUseCase = new CreateProductUseCase(productRepository)
    const product: InputCreateProductDto = {
      name: faker.commerce.productName(),
      price: faker.number.float({ min: 100, max: 1000 }),
    }
    const expectedOutput: OutputCreateProductDto = {
      id: expect.any(String),
      name: product.name,
      price: product.price,
    }
    const output = await createProductUseCase.execute(product)
    expect(output).toMatchObject(expectedOutput)
  })
})
