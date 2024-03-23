import { Sequelize } from 'sequelize-typescript'
import { CustomerModel } from '../../../infra/customer/repository/squelize/customer.model'
import { CustomerRepository } from '../../../infra/customer/repository/squelize/customer.repository'
import { Customer } from '../../../domain/customer/entity/customer'
import { faker } from '@faker-js/faker'
import { Address } from '../../../domain/customer/value-object/address'
import { InputFindCustomerDto } from './find-customer.dto'
import { FindCustomerUseCase } from './find-customer.usecase'

describe('Find customer use case', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })
    sequelize.addModels([CustomerModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository()
    const findCustomerUseCase = new FindCustomerUseCase(customerRepository)

    const customer = new Customer(faker.string.uuid(), faker.person.fullName())
    const address = new Address({
      city: faker.location.city(),
      number: Number(faker.location.buildingNumber()),
      state: faker.location.state(),
      street: faker.location.street(),
      zip: faker.location.zipCode(),
    })
    customer.changeAddress(address)

    await customerRepository.create(customer)

    const expectedOutput = {
      id: customer.id,
      name: customer.name,
      address: {
        city: address.city,
        number: address.number,
        state: address.state,
        street: address.street,
        zip: address.zip,
      },
    }
    const actualOutput = await findCustomerUseCase.execute({ id: customer.id })

    expect(actualOutput).toEqual(expectedOutput)
  })
})
