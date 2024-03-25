import { Product } from '../../../domain/product/entity/product'
import { MockRepository } from '../../../test/utils'
import { ListProductUseCase } from './list-product.usecase'

describe('List Product UseCase', () => {
  it('should list products', async () => {
    const productRepository = MockRepository<Product>()
    const storedProducts = [
      new Product('1', 'Product 1', 10),
      new Product('2', 'Product 2', 20),
    ]
    productRepository.findAll.mockResolvedValue(storedProducts)
    const listProductUseCase = new ListProductUseCase(productRepository)
    const expectedOutput = storedProducts.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
    }))
    const output = await listProductUseCase.execute({})
    expect(output).toEqual({ products: expectedOutput })
  })
  it('should return and empty list when no products are found', async () => {
    const productRepository = MockRepository<Product>()
    productRepository.findAll.mockResolvedValue([])
    const listProductUseCase = new ListProductUseCase(productRepository)
    const output = await listProductUseCase.execute({})
    expect(output).toEqual({ products: [] })
  })
})
