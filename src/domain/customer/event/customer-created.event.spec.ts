import { EventDispatcher } from '../../@shared/event/event-dispatcher'
import { Customer } from '../entity/customer'
import { CustomerCreatedEvent } from './customer-created.event'
import { SendConsoleLog1WhenCustomerCreatedHandler } from './handler/customer-created/send-console-log-1.handler'
import { SendConsoloLog2WhenCustomerCreatedHandler } from './handler/customer-created/send-console-log-2.handler'

describe('Customer Created Event', () => {
  it('should notify event handlers about the event', () => {
    const eventDispatcher = new EventDispatcher()
    const handler1 = new SendConsoleLog1WhenCustomerCreatedHandler()
    const handler2 = new SendConsoloLog2WhenCustomerCreatedHandler()
    const spyEventHandler1 = jest.spyOn(handler1, 'handle')
    const spyEventHandler2 = jest.spyOn(handler2, 'handle')
    eventDispatcher.register('CustomerCreatedEvent', handler1)
    eventDispatcher.register('CustomerCreatedEvent', handler2)
    const customer = new Customer('1', 'John Doe')
    const event = new CustomerCreatedEvent(customer)
    eventDispatcher.notify(event)
    expect(spyEventHandler1).toHaveBeenCalledTimes(1)
    expect(spyEventHandler2).toHaveBeenCalledTimes(1)
  })
})
