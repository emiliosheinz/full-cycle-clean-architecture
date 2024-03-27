import { faker } from '@faker-js/faker'
import { Product } from '../../../domain/product/entity/product'
import { ProductModel } from '../../../infra/product/repository/squelize/product.model'
import { ProductRepository } from '../../../infra/product/repository/squelize/product.repository'
import { setupSequelize } from '../../../test/utils'
import { FindProductUseCase } from './find-product.usecase'
import { EmptyResultError } from 'sequelize'

setupSequelize([ProductModel])
describe('Find Product UseCase', () => {
  it('should find a product', async () => {
    const productRepository = new ProductRepository()
    const storedProduct = new Product(
      faker.string.uuid(),
      faker.commerce.productName(),
      faker.number.float({ min: 100, max: 1000 })
    )
    productRepository.create(storedProduct)
    const findProductUseCase = new FindProductUseCase(productRepository)
    const expectedOutput = {
      id: storedProduct.id,
      name: storedProduct.name,
      price: storedProduct.price,
    }
    const output = await findProductUseCase.execute({ id: storedProduct.id })
    expect(output).toEqual(expectedOutput)
  })
  it('should throw an error when product is not found', async () => {
    const productRepository = new ProductRepository()
    const findProductUseCase = new FindProductUseCase(productRepository)
    try {
      await findProductUseCase.execute({ id: faker.string.alphanumeric() })
    } catch (error) {
      expect(error).toBeInstanceOf(EmptyResultError)
    }
  })
})
