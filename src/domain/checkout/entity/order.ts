import { OrderItem } from './order-item'

export class Order {
  private _id: string
  private _customerId: string
  private _items: OrderItem[]

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id
    this._customerId = customerId
    this._items = items
    this.validate()
  }

  validate() {
    if (this._id.length <= 0) {
      throw new Error('Id is required')
    }
    if (this._customerId.length <= 0) {
      throw new Error('Customer id is required')
    }
    if (this._items.length <= 0) {
      throw new Error('Items are required')
    }
  }

  get id(): string {
    return this._id
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.getTotal(), 0)
  }

  get customerId(): string {
    return this._customerId
  }

  get items(): OrderItem[] {
    return this._items
  }

  addItem(item: OrderItem) {
    this._items.push(item)
  }

  removeItem(id: string) {
    this._items = this._items.filter(item => item.id !== id)
  }
}
