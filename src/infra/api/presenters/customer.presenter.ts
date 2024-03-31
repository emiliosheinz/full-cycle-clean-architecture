import { XmlOptions, toXML } from 'jstoxml'
import { OutputListCustomerDto } from '../../../usecase/customer/list/list-customer.dto'

export class CustomerPresenter {
  static toXML(data: OutputListCustomerDto): string {
    const xmlOptions: XmlOptions = {
      header: true,
      indent: '  ',
    }
    return toXML(
      {
        customers: {
          customer: data.customers.map(customer => ({
            id: customer.id,
            name: customer.name,
            address: {
              street: customer.address.street,
              city: customer.address.city,
              state: customer.address.state,
              zip: customer.address.zip,
              number: customer.address.number,
            },
          })),
        },
      },
      xmlOptions
    )
  }
}
