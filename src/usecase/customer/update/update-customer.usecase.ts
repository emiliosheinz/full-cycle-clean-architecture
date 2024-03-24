import { CustomerRepositoryInterface } from '../../../domain/customer/repository/customer-repository.interface'
import { Address } from '../../../domain/customer/value-object/address'
import {
  InputUpdateCustomerDto,
  OutputUpdateCustomerDto,
} from './update-customer.dto'

export class UpdateCustomerUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}

  async execute(
    input: InputUpdateCustomerDto
  ): Promise<OutputUpdateCustomerDto> {
    const customer = await this.customerRepository.find(input.id)
    customer.changeName(input.name)
    customer.changeAddress(new Address(input.address))
    await this.customerRepository.update(customer)
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
