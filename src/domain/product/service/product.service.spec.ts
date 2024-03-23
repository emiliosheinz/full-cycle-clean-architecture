import { Product } from '../entity/product'
import { ProductService } from './product.service'

describe('Product service', () => {
  it('should change the price of all products', () => {
    const product1 = new Product('001', 'Product 1', 100)
    const product2 = new Product('002', 'Product 2', 200)
    const products = [product1, product2]

    ProductService.increasePrice(products, 100)

    expect(product1.price).toBe(200)
    expect(product2.price).toBe(400)
  })
})
