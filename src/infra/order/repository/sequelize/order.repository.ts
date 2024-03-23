import { Order } from '../../../../domain/checkout/entity/order'
import { OrderItem } from '../../../../domain/checkout/entity/order-item'
import { OrderRepositoryInterface } from '../../../../domain/checkout/repository/order-repository.interface'
import { OrderItemModel } from './order-item.model'
import { OrderModel } from './order.model'

export class OrderRepository implements OrderRepositoryInterface {
  private fromOrderItemToDatabase(orderItem: OrderItem) {
    return {
      id: orderItem.id,
      name: orderItem.name,
      price: orderItem.price,
      product_id: orderItem.productId,
      quantity: orderItem.quantity,
    }
  }

  private fromDatabaseToOrder(orderModel: OrderModel): Order {
    const items = orderModel.items.map(item => {
      return new OrderItem(
        item.id,
        item.name,
        item.price,
        item.product_id,
        item.quantity
      )
    })

    return new Order(orderModel.id, orderModel.customer_id, items)
  }

  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map(this.fromOrderItemToDatabase),
      },
      { include: [{ model: OrderItemModel }] }
    )
  }

  async update(entity: Order): Promise<void> {
    const items = entity.items.map(this.fromOrderItemToDatabase)

    const storedItems = await OrderItemModel.findAll({
      where: { order_id: entity.id },
    })
    const itemsToUpdate = items.filter(item =>
      storedItems.some(storedItem => storedItem.id === item.id)
    )
    const itemsToCreate = items.filter(
      item => !storedItems.some(storedItem => storedItem.id === item.id)
    )
    const itemsToDelete = storedItems.filter(
      storedItem => !items.some(item => storedItem.id === item.id)
    )

    const createItems = itemsToCreate.map(item =>
      OrderItemModel.create({ ...item, order_id: entity.id })
    )

    const updateItems = itemsToUpdate.map(item =>
      OrderItemModel.update(item, { where: { id: item.id } })
    )

    const deleteItems = itemsToDelete.map(item =>
      OrderItemModel.destroy({ where: { id: item.id } })
    )

    await Promise.all([...createItems, ...updateItems, ...deleteItems])

    await OrderModel.update(
      { total: entity.total() },
      { where: { id: entity.id } }
    )
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id },
      include: ['items'],
    })

    if (!orderModel) {
      throw new Error('Order not found')
    }

    return this.fromDatabaseToOrder(orderModel)
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({ include: ['items'] })
    return orderModels.map(this.fromDatabaseToOrder)
  }
}
