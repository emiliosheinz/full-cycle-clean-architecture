import { Product } from './product'

describe('Product', () => {
  it('should throw an error when id is empty', () => {
    expect(() => new Product('', 'Product Name', 100)).toThrow(
      'product: Id is required'
    )
  })

  it('should throw an error when name is empty', () => {
    expect(() => new Product('1', '', 100)).toThrow('product: Name is required')
  })

  it('should throw an error when price is negative', () => {
    expect(() => new Product('1', 'Product Name', -100)).toThrow(
      'product: Price must be greater than zero'
    )
  })

  it('should throw and error when id and name are empty and price is negative', () => {
    expect(() => new Product('', '', -100)).toThrow(
      'product: Id is required, product: Name is required, product: Price must be greater than zero'
    )
  })

  it('should change name', () => {
    const product = new Product('1', 'Product Name', 100)
    product.changeName('New Product Name')
    expect(product.name).toBe('New Product Name')
  })

  it('should not change name when new name is empty', () => {
    const product = new Product('1', 'Product Name', 100)
    expect(() => product.changeName('')).toThrow('product: Name is required')
  })

  it('should change price', () => {
    const product = new Product('1', 'Product Name', 100)
    product.changePrice(200)
    expect(product.price).toBe(200)
  })

  it('should not change price when new price is negative', () => {
    const product = new Product('1', 'Product Name', 100)
    expect(() => product.changePrice(-200)).toThrow(
      'product: Price must be greater than zero'
    )
  })
})
