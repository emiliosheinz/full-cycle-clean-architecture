import { EventHandlerInterface } from '../../../../@shared/event/event-handler.interface'
import { CustomerChangedAddressEvent } from '../../customer-changed-address.event'
import { CustomerCreatedEvent } from '../../customer-created.event'

export class SendConsoleLogWhenCustomerChangedAddressHandler
  implements EventHandlerInterface<CustomerChangedAddressEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log(
      `Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para ${event.eventData.address}`
    )
  }
}
