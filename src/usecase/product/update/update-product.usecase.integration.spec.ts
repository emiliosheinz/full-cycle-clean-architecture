import { faker } from '@faker-js/faker'
import { ProductModel } from '../../../infra/product/repository/squelize/product.model'
import { setupSequelize } from '../../../test/utils'
import { UpdateProductUseCase } from './update-product.usecase'
import { InputUpdateProductDto } from './update-product.dto'
import { ProductRepository } from '../../../infra/product/repository/squelize/product.repository'
import { Product } from '../../../domain/product/entity/product'

setupSequelize([ProductModel])

describe('Update Product UseCase', () => {
  it('should update a product', async () => {
    const productRepository = new ProductRepository()
    const storedProduct = new Product(
      faker.string.uuid(),
      faker.commerce.productName(),
      faker.number.float({ min: 100, max: 1000 })
    )
    productRepository.create(storedProduct)
    const updateProductUseCase = new UpdateProductUseCase(productRepository)
    const input: InputUpdateProductDto = {
      id: storedProduct.id,
      name: faker.commerce.productName(),
      price: faker.number.float({ min: 100, max: 1000 }),
    }
    const output = await updateProductUseCase.execute(input)
    expect(output).toEqual(input)
  })
  it('should throw an error when product is not found', async () => {
    const productRepository = new ProductRepository()
    const updateProductUseCase = new UpdateProductUseCase(productRepository)
    try {
      await updateProductUseCase.execute({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: faker.number.float({ min: 100, max: 1000 }),
      })
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })
})
