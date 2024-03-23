import { SendEmailWhenProductIsCreatedHandler } from '../../product/event/handler/send-email-when-product-is-created.handler'
import { ProductCreatedEvent } from '../../product/event/product-created.event'
import { EventDispatcher } from './event-dispatcher'

describe('Domain events', () => {
  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()
    eventDispatcher.register('ProductCreatedEvent', eventHandler)
    expect(eventDispatcher.eventHandlers['ProductCreatedEvent']).toBeDefined()
    expect(eventDispatcher.eventHandlers['ProductCreatedEvent'].length).toBe(1)
    expect(eventDispatcher.eventHandlers['ProductCreatedEvent'][0]).toBe(
      eventHandler
    )
  })

  it('should unregister an event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()
    eventDispatcher.register('ProductCreatedEvent', eventHandler)
    expect(eventDispatcher.eventHandlers['ProductCreatedEvent']).toBeDefined()
    eventDispatcher.unregister('ProductCreatedEvent', eventHandler)
    expect(eventDispatcher.eventHandlers['ProductCreatedEvent']).toBeDefined()
    expect(eventDispatcher.eventHandlers['ProductCreatedEvent'].length).toBe(0)
  })

  it('should unregister all event handlers', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()
    eventDispatcher.register('ProductCreatedEvent', eventHandler)
    expect(eventDispatcher.eventHandlers['ProductCreatedEvent']).toBeDefined()
    eventDispatcher.unregisterAll()
    expect(eventDispatcher.eventHandlers['ProductCreatedEvent']).toBeUndefined()
  })

  it('should notify event handlers', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()
    const spyEventHandler = jest.spyOn(eventHandler, 'handle')
    eventDispatcher.register('ProductCreatedEvent', eventHandler)
    const productCreatedEvent = new ProductCreatedEvent({
      name: 'Product name',
      description: 'Product description',
      price: 100,
    })
    eventDispatcher.notify(productCreatedEvent)
    expect(spyEventHandler).toHaveBeenCalledTimes(1)
  })
})
