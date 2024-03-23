import { Customer } from '../../customer/entity/customer'
import { Order } from '../entity/order'
import { OrderItem } from '../entity/order-item'
import { OrderService } from './order.service'

describe('Order service', () => {
  it('should calculate the total price of all orders', () => {
    const orderItem = new OrderItem('OI1', 'Order Item 1', 100, 'P1', 2)
    const orderItem2 = new OrderItem('OI2', 'Order Item 2', 200, 'P1', 1)

    const order = new Order('O1', 'C1', [orderItem])
    const order2 = new Order('O2', 'C2', [orderItem, orderItem2])

    const total = OrderService.calculateTotal([order, order2])

    expect(total).toBe(600)
  })

  it('should place an order', () => {
    const customer = new Customer('C1', 'Customer 1')
    const orderItem = new OrderItem('OI1', 'Order Item 1', 100, 'P1', 2)
    const order = OrderService.placeOrder(customer, [orderItem])
    expect(customer.rewardedPoints).toBe(100)
    expect(order.total()).toBe(200)
  })
})
