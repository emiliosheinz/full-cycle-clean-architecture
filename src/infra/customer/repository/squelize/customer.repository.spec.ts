import { Sequelize } from 'sequelize-typescript'
import { CustomerModel } from './customer.model'
import { CustomerRepository } from './customer.repository'
import { Customer } from '../../../../domain/customer/entity/customer'
import { Address } from '../../../../domain/customer/value-object/address'

describe('Customer repository test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    await sequelize.addModels([CustomerModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a customer', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address({
      street: 'Street 1',
      number: 1,
      state: 'State 1',
      city: 'City 1',
      zip: 'ZipCode 1',
    })
    customer.address = address
    await customerRepository.create(customer)

    const customerModel = await CustomerModel.findOne({
      where: { id: customer.id },
    })

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      street: address.street,
      state: address.state,
      number: address.number,
      zipCode: address.zip,
      city: address.city,
      active: customer.isActive,
      rewardedPoints: customer.rewardedPoints,
    })
  })

  it('should update a customer', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address({
      street: 'Street 1',
      number: 1,
      state: 'State 1',
      city: 'City 1',
      zip: 'ZipCode 1',
    })
    customer.address = address
    await customerRepository.create(customer)

    customer.changeName('Customer 2')
    await customerRepository.update(customer)
    const customerModel = await CustomerModel.findOne({ where: { id: '123' } })

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      street: address.street,
      state: address.state,
      number: address.number,
      zipCode: address.zip,
      city: address.city,
      active: customer.isActive,
      rewardedPoints: customer.rewardedPoints,
    })
  })

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address({
      street: 'Street 1',
      number: 1,
      state: 'State 1',
      city: 'City 1',
      zip: 'ZipCode 1',
    })
    customer.address = address
    await customerRepository.create(customer)

    const customerResult = await customerRepository.find(customer.id)

    expect(customer).toStrictEqual(customerResult)
  })

  it('should throw an error when customer is not found', async () => {
    const customerRepository = new CustomerRepository()

    expect(async () => {
      await customerRepository.find('456ABC')
    }).rejects.toThrow('Customer not found')
  })

  it('should find all customers', async () => {
    const customerRepository = new CustomerRepository()
    const customer1 = new Customer('123', 'Customer 1')
    const address1 = new Address({
      street: 'Street 1',
      number: 1,
      state: 'State 1',
      city: 'City 1',
      zip: 'ZipCode 1',
    })
    customer1.address = address1
    customer1.addRewardPoints(10)
    customer1.activate()

    const customer2 = new Customer('456', 'Customer 2')
    const address2 = new Address({
      street: 'Street 2',
      number: 2,
      state: 'State 2',
      city: 'City 2',
      zip: 'ZipCode 2',
    })
    customer2.address = address2
    customer2.addRewardPoints(20)

    await customerRepository.create(customer1)
    await customerRepository.create(customer2)

    const customers = await customerRepository.findAll()

    expect(customers).toHaveLength(2)
    expect(customers).toContainEqual(customer1)
    expect(customers).toContainEqual(customer2)
  })
})
