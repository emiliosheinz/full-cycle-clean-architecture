import { faker } from '@faker-js/faker'
import { InputCreateCustomerDto } from './create-customer.dto'
import { CreateCustomerUseCase } from './create-customer.usecase'

const input: InputCreateCustomerDto = {
  name: faker.person.fullName(),
  address: {
    city: faker.location.city(),
    number: Number(faker.location.buildingNumber()),
    state: faker.location.state(),
    street: faker.location.street(),
    zip: faker.location.zipCode(),
  },
}

const MockRepository = () => ({
  find: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
})

describe('Create customer use case', () => {
  it('should create a customer', async () => {
    const customerRepository = MockRepository()
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository)

    const expectedOutput = {
      id: expect.any(String),
      name: input.name,
      address: input.address,
    }
    const actualOutput = await createCustomerUseCase.execute(input)

    expect(actualOutput).toEqual(expectedOutput)
  })
})
