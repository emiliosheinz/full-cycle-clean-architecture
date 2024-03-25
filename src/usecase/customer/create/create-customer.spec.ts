import { faker } from '@faker-js/faker'
import { InputCreateCustomerDto } from './create-customer.dto'
import { CreateCustomerUseCase } from './create-customer.usecase'
import { MockRepository } from '../../../test/utils'
import { Customer } from '../../../domain/customer/entity/customer'

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

describe('Create customer use case', () => {
  it('should create a customer', async () => {
    const customerRepository = MockRepository<Customer>()
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
