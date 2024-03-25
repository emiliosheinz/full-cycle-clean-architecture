import { faker } from '@faker-js/faker'
import { CreateProductUseCase } from './create-product.usecase'
import { InputCreateProductDto } from './create-product.dto'
import { MockRepository } from '../../../test/utils'
import { Product } from '../../../domain/product/entity/product'

describe('Create Product UseCase', () => {
  it('should create a product', async () => {
    const productRepository = MockRepository<Product>()
    const input: InputCreateProductDto = {
      name: faker.commerce.productName(),
      price: faker.number.float(),
    }
    const createProductUseCase = new CreateProductUseCase(productRepository)
    await createProductUseCase.execute(input)
    expect(productRepository.create).toHaveBeenCalledTimes(1)
  })

  it('should throw an error when product creation fails', async () => {
    const productRepository = MockRepository<Product>()
    productRepository.create.mockRejectedValue(
      new Error('Failed to create product')
    )
    const input: InputCreateProductDto = {
      name: faker.commerce.productName(),
      price: faker.number.float(),
    }
    const createProductUseCase = new CreateProductUseCase(productRepository)
    try {
      await createProductUseCase.execute(input)
    } catch (error) {
      expect(error).toMatchObject(new Error('Failed to create product'))
    }
  })
})
