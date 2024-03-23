import { Address } from './domain/customer/value-object/address'
import { Customer } from './domain/customer/entity/customer'
import { OrderItem } from './domain/checkout/entity/order-item'
import { Order } from './domain/checkout/entity/order'

const customer = new Customer('1', 'John Doe')
const address = new Address({
  street: 'Main Street',
  number: 1920,
  city: 'New York',
  state: 'New York',
  zip: '10044',
})
customer.address = address
customer.activate()

const items = Array.from(
  { length: 10 },
  (_, i) => new OrderItem(String(i), `Item ${i}`, i * 10, '1', i + 1)
)

const order = new Order('1', '1', items)
