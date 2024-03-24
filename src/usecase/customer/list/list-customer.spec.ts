import { faker } from '@faker-js/faker'
import { CustomerFactory } from '../../../domain/customer/factory/customer.factory'
import { Address } from '../../../domain/customer/value-object/address'
import { ListCustomerUseCase } from './list-customer.usecase'

const customer1 = CustomerFactory.createWithAddress(
  faker.person.fullName(),
  new Address({
    city: faker.location.city(),
    number: Number(faker.location.buildingNumber()),
    state: faker.location.state(),
    street: faker.location.street(),
    zip: faker.location.zipCode(),
  })
)
const customer2 = CustomerFactory.createWithAddress(
  faker.person.fullName(),
  new Address({
    city: faker.location.city(),
    number: Number(faker.location.buildingNumber()),
    state: faker.location.state(),
    street: faker.location.street(),
    zip: faker.location.zipCode(),
  })
)

const MockRepository = () => ({
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn(),
})

describe('List customer use case', () => {
  it('should list all customers', async () => {
    const repository = MockRepository()
    repository.findAll.mockResolvedValue([customer1, customer2])
    const listCustomerUseCase = new ListCustomerUseCase(repository)

    const expectedOutput = {
      customers: [
        {
          id: customer1.id,
          name: customer1.name,
          address: {
            city: customer1.address.city,
            number: customer1.address.number,
            state: customer1.address.state,
            street: customer1.address.street,
            zip: customer1.address.zip,
          },
        },
        {
          id: customer2.id,
          name: customer2.name,
          address: {
            city: customer2.address.city,
            number: customer2.address.number,
            state: customer2.address.state,
            street: customer2.address.street,
            zip: customer2.address.zip,
          },
        },
      ],
    }
    const actualOutput = await listCustomerUseCase.execute({})

    expect(actualOutput).toEqual(expectedOutput)
  })
})
