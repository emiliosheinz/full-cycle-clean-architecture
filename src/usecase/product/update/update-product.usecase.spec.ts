import { fa, faker } from '@faker-js/faker'
import { Product } from '../../../domain/product/entity/product'
import { MockRepository } from '../../../test/utils'
import { UpdateProductUseCase } from './update-product.usecase'
import { InputUpdateProductDto } from './update-product.dto'

describe('Update Product UseCase', () => {
  it('should update a product', async () => {
    const productRepository = MockRepository<Product>()
    const input: InputUpdateProductDto = {
      id: faker.string.alphanumeric(),
      name: faker.commerce.productName(),
      price: faker.number.float(),
    }
    productRepository.find.mockResolvedValue(
      new Product(input.id, faker.commerce.productName(), faker.number.float())
    )
    const updateProductUseCase = new UpdateProductUseCase(productRepository)
    const output = await updateProductUseCase.execute(input)
    expect(output).toEqual(input)
  })

  it('should throw and error when product is not found', async () => {
    const productRepository = MockRepository<Product>()
    productRepository.find.mockRejectedValue(new Error('Product not found'))
    const input: InputUpdateProductDto = {
      id: faker.string.alphanumeric(),
      name: faker.commerce.productName(),
      price: faker.number.float(),
    }
    const updateProductUseCase = new UpdateProductUseCase(productRepository)
    try {
      await updateProductUseCase.execute(input)
    } catch (error) {
      expect(error).toMatchObject(new Error('Product not found'))
    }
  })

  it('should throw and error when product update fails', async () => {
    const productRepository = MockRepository<Product>()
    const input: InputUpdateProductDto = {
      id: faker.string.alphanumeric(),
      name: faker.commerce.productName(),
      price: faker.number.float(),
    }
    productRepository.find.mockResolvedValue(
      new Product(input.id, faker.commerce.productName(), faker.number.float())
    )
    productRepository.update.mockRejectedValue(
      new Error('Failed to update product')
    )
    const updateProductUseCase = new UpdateProductUseCase(productRepository)
    try {
      await updateProductUseCase.execute(input)
    } catch (error) {
      expect(error).toMatchObject(new Error('Failed to update product'))
    }
  })
})
