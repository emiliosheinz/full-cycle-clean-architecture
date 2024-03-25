import { faker } from '@faker-js/faker'
import { Product } from '../../../domain/product/entity/product'
import { MockRepository } from '../../../test/utils'
import { FindProductUseCase } from './find-product.usecase'

describe('Find Product UseCase', () => {
  it('should find a product', async () => {
    const productRepository = MockRepository<Product>()
    const storedProduct = new Product('1', 'Product 1', 10)
    productRepository.find.mockResolvedValue(storedProduct)
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
    const productRepository = MockRepository<Product>()
    productRepository.find.mockRejectedValue(new Error('Product not found'))
    const findProductUseCase = new FindProductUseCase(productRepository)
    try {
      await findProductUseCase.execute({ id: faker.string.alphanumeric() })
    } catch (error) {
      expect(error).toMatchObject(new Error('Product not found'))
    }
  })
})
