import { Address } from '../value-object/address'

export class Customer {
  private _id: string
  private _name: string
  private _address?: Address
  private _isActive: boolean = false
  private _rewardedPoints: number = 0

  constructor(id: string, name: string) {
    this._id = id
    this._name = name
    this.validate()
  }

  validate() {
    if (this._id.length <= 0) {
      throw new Error('Id is required')
    }
    if (this._name.length <= 0) {
      throw new Error('Name is required')
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

  get id(): string {
    return this._id
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
