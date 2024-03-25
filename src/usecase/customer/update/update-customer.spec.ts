import { faker } from '@faker-js/faker'
import { CustomerFactory } from '../../../domain/customer/factory/customer.factory'
import { Address } from '../../../domain/customer/value-object/address'
import { InputUpdateCustomerDto } from './update-customer.dto'
import { UpdateCustomerUseCase } from './update-customer.usecase'
import { MockRepository } from '../../../test/utils'
import { Customer } from '../../../domain/customer/entity/customer'

const address = new Address({
  city: faker.location.city(),
  number: Number(faker.location.buildingNumber()),
  state: faker.location.state(),
  street: faker.location.street(),
  zip: faker.location.zipCode(),
})
const customer = CustomerFactory.createWithAddress(
  faker.person.fullName(),
  address
)

const input: InputUpdateCustomerDto = {
  id: customer.id,
  name: faker.person.fullName(),
  address: {
    city: faker.location.city(),
    number: Number(faker.location.buildingNumber()),
    state: faker.location.state(),
    street: faker.location.street(),
    zip: faker.location.zipCode(),
  },
}

describe('Update customer use case', () => {
  it('should update a customer', async () => {
    const repository = MockRepository<Customer>()
    repository.find.mockResolvedValue(customer)
    const updateCustomerUseCase = new UpdateCustomerUseCase(repository)

    const output = await updateCustomerUseCase.execute(input)

    expect(output).toEqual(input)
  })

  it('should throw an error when customer not found', async () => {
    const repository = MockRepository<Customer>()
    repository.find.mockImplementation(() => {
      throw new Error('Customer not found')
    })
    const updateCustomerUseCase = new UpdateCustomerUseCase(repository)

    await expect(updateCustomerUseCase.execute(input)).rejects.toThrowError(
      'Customer not found'
    )
  })
})
