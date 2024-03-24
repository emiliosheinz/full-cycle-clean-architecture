import { v4 as uuidv4 } from 'uuid'
import { CustomerRepositoryInterface } from '../../../domain/customer/repository/customer-repository.interface'
import {
  InputCreateCustomerDto,
  OutputCreateCustomerDto,
} from './create-customer.dto'
import { CustomerFactory } from '../../../domain/customer/factory/customer.factory'
import { Address } from '../../../domain/customer/value-object/address'

export class CreateCustomerUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}

  async execute(
    input: InputCreateCustomerDto
  ): Promise<OutputCreateCustomerDto> {
    const address = new Address(input.address)
    const customer = CustomerFactory.createWithAddress(input.name, address)
    await this.customerRepository.create(customer)
    return {
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
  }
}
