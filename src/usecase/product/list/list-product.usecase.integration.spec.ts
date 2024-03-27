import { faker } from '@faker-js/faker'
import { Product } from '../../../domain/product/entity/product'
import { ProductModel } from '../../../infra/product/repository/squelize/product.model'
import { ProductRepository } from '../../../infra/product/repository/squelize/product.repository'
import { setupSequelize } from '../../../test/utils'
import { FindProductUseCase } from '../find/find-product.usecase'
import { ListProductUseCase } from './list-product.usecase'
import { InputListProductDto } from './list-product.dto'

setupSequelize([ProductModel])

describe('List Product UseCase', () => {
  it('should list all products', async () => {
    const productRepository = new ProductRepository()
    const storedProducts = [
      new Product(
        faker.string.uuid(),
        faker.commerce.productName(),
        faker.number.float({ min: 100, max: 1000 })
      ),
      new Product(
        faker.string.uuid(),
        faker.commerce.productName(),
        faker.number.float({ min: 100, max: 1000 })
      ),
    ]
    storedProducts.forEach(product => productRepository.create(product))
    const listProductUseCase = new ListProductUseCase(productRepository)
    const expectedOutput: InputListProductDto = {
      products: storedProducts.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    }
    const output = await listProductUseCase.execute({})
    expect(output).toEqual(expectedOutput)
  })
  it('should return an empty array when there are no products', async () => {
    const productRepository = new ProductRepository()
    const listProductUseCase = new ListProductUseCase(productRepository)
    const output = await listProductUseCase.execute({})
    expect(output).toEqual({ products: [] })
  })
})
