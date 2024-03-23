import { Order } from './order'
import { OrderItem } from './order-item'

describe('Order', () => {
  it('should throw an error when id is empty', () => {
    expect(() => new Order('', '1', [])).toThrow('Id is required')
  })

  it('should throw an error when customer id is empty', () => {
    expect(() => new Order('1', '', [])).toThrow('Customer id is required')
  })

  it('should throw an error when items is empty', () => {
    expect(() => new Order('1', '1', [])).toThrow('Items are required')
  })

  it('should calculate total', () => {
    const orderItems = [
      new OrderItem('1', 'Product 1', 100, 'p1', 2),
      new OrderItem('2', 'Product 2', 200, 'p2', 2),
      new OrderItem('3', 'Product 3', 300, 'p3', 1),
    ]
    const order = new Order('1', '1', orderItems)
    expect(order.total()).toBe(900)
  })

  it('should throw error if the item quantity is less or equals 0', () => {
    expect(() => {
      const orderItem = new OrderItem('1', 'Product 1', 100, 'p1', 0)
      new Order('1', '1', [orderItem])
    }).toThrow('Quantity must be greater than 0')
  })
})
