import { Customer } from '../../../domain/customer/entity/customer'
import { CustomerRepositoryInterface } from '../../../domain/customer/repository/customer-repository.interface'
import {
  InputListCustomerDto,
  OutputListCustomerDto,
} from './list-customer.dto'

export class ListCustomerUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}

  async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
    const customers = await this.customerRepository.findAll()
    return OutputMapper.toOutput(customers)
  }
}

class OutputMapper {
  static toOutput(customer: Customer[]): OutputListCustomerDto {
    return {
      customers: customer.map(customer => ({
        id: customer.id,
        name: customer.name,
        address: {
          city: customer.address.city,
          number: customer.address.number,
          state: customer.address.state,
          street: customer.address.street,
          zip: customer.address.zip,
        },
      })),
    }
  }
}
