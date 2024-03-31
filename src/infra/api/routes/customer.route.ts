import { Request, Response, Router } from 'express'
import { CreateCustomerUseCase } from '../../../usecase/customer/create/create-customer.usecase'
import { CustomerRepository } from '../../customer/repository/squelize/customer.repository'
import { InputCreateCustomerDto } from '../../../usecase/customer/create/create-customer.dto'
import { ListCustomerUseCase } from '../../../usecase/customer/list/list-customer.usecase'
import { CustomerPresenter } from '../presenters/customer.presenter'

export const customerRoute = Router()

customerRoute.post('/', async (req: Request, res: Response) => {
  const customerRepository = new CustomerRepository()
  const createCustomerUseCase = new CreateCustomerUseCase(customerRepository)
  try {
    const customerDto: InputCreateCustomerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        city: req.body.address.city,
        state: req.body.address.state,
        zip: req.body.address.zip,
      },
    }
    const output = await createCustomerUseCase.execute(customerDto)
    res.status(200).send(output)
  } catch (error) {
    res.status(400).send(error)
  }
})

customerRoute.get('/', async (_: Request, res: Response) => {
  try {
    const customerRepository = new CustomerRepository()
    const listCustomerUseCase = new ListCustomerUseCase(customerRepository)
    const output = await listCustomerUseCase.execute({})
    res.format({
      json: () => res.status(200).send(output),
      xml: () => res.status(200).send(CustomerPresenter.toXML(output)),
    })
  } catch (error) {
    res.status(400).send(error)
  }
})
