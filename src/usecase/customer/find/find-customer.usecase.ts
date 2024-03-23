import { CustomerRepositoryInterface } from '../../../domain/customer/repository/customer-repository.interface'
import {
  InputFindCustomerDto,
  OutputFindCustomerDto,
} from './find-customer.dto'

export class FindCustomerUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}

  async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
    const customer = await this.customerRepository.find(input.id)
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
