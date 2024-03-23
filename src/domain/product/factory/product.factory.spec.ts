import { ProductFactory } from './product.factory'

describe('Product Factory', () => {
  it('should create a product type A', () => {
    const product = ProductFactory.create('A', 'Product A', 100)

    expect(product.id).toBeDefined()
    expect(product.name).toBe('Product A')
    expect(product.price).toBe(100)
    expect(product.constructor.name).toBe('Product')
  })

  it('should create a product type B', () => {
    const product = ProductFactory.create('B', 'Product B', 100)

    expect(product.id).toBeDefined()
    expect(product.name).toBe('Product B')
    expect(product.price).toBe(100 * 2)
    expect(product.constructor.name).toBe('ProductB')
  })

  it('should throw an error when type is invalid', () => {
    expect(() => ProductFactory.create('C' as any, 'Product C', 100)).toThrow(
      'Invalid product type'
    )
  })
})
