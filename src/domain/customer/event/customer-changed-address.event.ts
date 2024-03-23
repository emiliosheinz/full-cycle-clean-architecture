import { EventInterface } from '../../@shared/event/event.interface'
import { Customer } from '../entity/customer'

export class CustomerChangedAddressEvent implements EventInterface {
  dateTimeOccurred: Date
  eventData: Customer

  constructor(customer: Customer) {
    this.dateTimeOccurred = new Date()
    this.eventData = customer
  }
}
