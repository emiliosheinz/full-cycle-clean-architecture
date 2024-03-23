import { th } from '@faker-js/faker'
import EventDispatcherInterface from './event-dispatcher.interface'
import { EventHandlerInterface } from './event-handler.interface'
import { EventInterface } from './event.interface'

export class EventDispatcher implements EventDispatcherInterface {
  private handlers: Record<string, EventHandlerInterface<EventInterface>[]> = {}

  get eventHandlers(): Record<string, EventHandlerInterface<EventInterface>[]> {
    return this.handlers
  }

  notify(event: EventInterface): void {
    const eventName = event.constructor.name
    const eventHandlers = this.handlers[eventName]
    if (!eventHandlers) {
      return
    }
    eventHandlers.forEach(handler => handler.handle(event))
  }

  register(
    eventName: string,
    handler: EventHandlerInterface<EventInterface>
  ): void {
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = []
    }
    this.handlers[eventName].push(handler)
  }

  unregister(
    eventName: string,
    handler: EventHandlerInterface<EventInterface>
  ): void {
    const eventHandlers = this.handlers[eventName]
    const index = eventHandlers.indexOf(handler)
    if (index !== -1) {
      eventHandlers.splice(index, 1)
    }
  }

  unregisterAll(): void {
    this.handlers = {}
  }
}
