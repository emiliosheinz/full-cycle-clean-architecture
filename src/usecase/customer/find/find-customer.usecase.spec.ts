import { Customer } from '../../../domain/customer/entity/customer'
import { faker } from '@faker-js/faker'
import { Address } from '../../../domain/customer/value-object/address'
import { FindCustomerUseCase } from './find-customer.usecase'
import { CustomerRepositoryInterface } from '../../../domain/customer/repository/customer-repository.interface'

function makeCustomer() {
  const customer = new Customer(faker.string.uuid(), faker.person.fullName())
  const address = new Address({
    city: faker.location.city(),
    number: Number(faker.location.buildingNumber()),
    state: faker.location.state(),
    street: faker.location.street(),
    zip: faker.location.zipCode(),
  })
  customer.changeAddress(address)
  return customer
}

function MockCustomerRepository(): jest.Mocked<CustomerRepositoryInterface> {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Find customer use case', () => {
  it('should find a customer', async () => {
    const customer = makeCustomer()
    const customerRepository = MockCustomerRepository()
    customerRepository.find.mockResolvedValue(customer)
    const findCustomerUseCase = new FindCustomerUseCase(customerRepository)

    const expectedOutput = {
      id: customer.id,
      name: customer.name,
      address: {
        city: customer.address.city,
        number: customer.address.number,
        state: customer.address.state,
        street: customer.address.street,
        zip: customer.address.zip,
      },
    }
    const actualOutput = await findCustomerUseCase.execute({ id: customer.id })

    expect(actualOutput).toEqual(expectedOutput)
  })

  it('should throw an error when customer is not found', async () => {
    const customerRepository = MockCustomerRepository()
    customerRepository.find.mockImplementation(() => {
      throw new Error('Customer not found')
    })
    const findCustomerUseCase = new FindCustomerUseCase(customerRepository)

    await expect(
      findCustomerUseCase.execute({ id: faker.string.uuid() })
    ).rejects.toThrow('Customer not found')
  })
})
