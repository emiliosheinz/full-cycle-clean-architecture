import { Entity } from '../../@shared/entity/entity.abstract'
import { NotificationError } from '../../@shared/notification/notification.error'
import { CustomerValidatorFactory } from '../factory/customer-validator.factory'
import { Address } from '../value-object/address'

export class Customer extends Entity {
  private _name: string
  private _address?: Address
  private _isActive: boolean = false
  private _rewardedPoints: number = 0

  constructor(id: string, name: string) {
    super()
    this._id = id
    this._name = name
    this.validate()
  }

  validate() {
    CustomerValidatorFactory.create().validate(this)
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.errors)
    }
  }

  changeName(name: string) {
    this._name = name
    this.validate()
  }

  changeAddress(address: Address) {
    this._address = address
  }

  activate() {
    if (!this._address) {
      throw new Error('Address is required to activate customer')
    }
    this._isActive = true
  }

  deactivate() {
    this._isActive = false
  }

  addRewardPoints(points: number) {
    this._rewardedPoints += points
  }

  get rewardedPoints(): number {
    return this._rewardedPoints
  }

  get name(): string {
    return this._name
  }

  get isActive(): boolean {
    return this._isActive
  }

  get address(): Address {
    return this._address
  }

  set address(address: Address) {
    this._address = address
  }
}
