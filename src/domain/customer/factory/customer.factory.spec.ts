import { Customer } from '../entity/customer'
import { Address } from '../value-object/address'
import { CustomerFactory } from './customer.factory'

describe('Customer Factory', () => {
  it('should create a customer', () => {
    const customer = CustomerFactory.create('John Doe')

    expect(customer).toBeInstanceOf(Customer)
    expect(customer.name).toBe('John Doe')
    expect(customer.address).toBeUndefined()
  })

  it('should create a customer with address', () => {
    const address = new Address({
      street: 'Main St.',
      number: 1921,
      city: 'São Paulo',
      state: 'São Paulo',
      zip: '01000-000',
    })
    const customer = CustomerFactory.createWithAddress('John Doe', address)
    expect(customer).toBeInstanceOf(Customer)
    expect(customer.name).toBe('John Doe')
    expect(customer.address).toBeInstanceOf(Address)
    expect(customer.address).toEqual(address)
  })
})
