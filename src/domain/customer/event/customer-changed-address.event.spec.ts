import { EventDispatcher } from '../../@shared/event/event-dispatcher'
import { Customer } from '../entity/customer'
import { Address } from '../value-object/address'
import { CustomerChangedAddressEvent } from './customer-changed-address.event'
import { SendConsoleLogWhenCustomerChangedAddressHandler } from './handler/customer-changed-address/send-console-log-1.handler'

describe('Customer Changed Address Event', () => {
  it('should notify event handlers about the event', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendConsoleLogWhenCustomerChangedAddressHandler()
    const spyEventHandler = jest.spyOn(eventHandler, 'handle')
    eventDispatcher.register('CustomerChangedAddressEvent', eventHandler)
    const customer = new Customer('1', 'John Doe')
    const address = new Address({
      street: 'Main St.',
      number: 1921,
      city: 'São Paulo',
      state: 'São Paulo',
      zip: '01000-000',
    })
    customer.changeAddress(address)
    const event = new CustomerChangedAddressEvent(customer)
    eventDispatcher.notify(event)
    expect(spyEventHandler).toHaveBeenCalledTimes(1)
  })
})
