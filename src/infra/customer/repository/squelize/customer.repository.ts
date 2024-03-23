import { Address } from '../../../../domain/customer/value-object/address'
import { Customer } from '../../../../domain/customer/entity/customer'
import { CustomerRepositoryInterface } from '../../../../domain/customer/repository/customer-repository.interface'
import { CustomerModel } from './customer.model'

export class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      state: entity.address.state,
      number: entity.address.number,
      zipCode: entity.address.zip,
      city: entity.address.city,
      active: entity.isActive,
      rewardedPoints: entity.rewardedPoints,
    })
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        id: entity.id,
        name: entity.name,
        street: entity.address.street,
        state: entity.address.state,
        number: entity.address.number,
        zipCode: entity.address.zip,
        city: entity.address.city,
        active: entity.isActive,
        rewardedPoints: entity.rewardedPoints,
      },
      {
        where: {
          id: entity.id,
        },
      }
    )
  }

  async find(id: string): Promise<Customer> {
    let customerModel
    try {
      customerModel = await CustomerModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      })
    } catch (error) {
      throw new Error('Customer not found')
    }

    const customer = new Customer(id, customerModel.name)
    const address = new Address({
      street: customerModel.street,
      number: customerModel.number,
      city: customerModel.city,
      state: customerModel.state,
      zip: customerModel.zipCode,
    })
    customer.changeAddress(address)
    return customer
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll()

    const customers = customerModels.map(customerModels => {
      let customer = new Customer(customerModels.id, customerModels.name)
      customer.addRewardPoints(customerModels.rewardedPoints)
      const address = new Address({
        street: customerModels.street,
        number: customerModels.number,
        city: customerModels.city,
        state: customerModels.state,
        zip: customerModels.zipCode,
      })
      customer.changeAddress(address)
      if (customerModels.active) {
        customer.activate()
      }
      return customer
    })

    return customers
  }
}
