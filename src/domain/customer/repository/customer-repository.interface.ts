import { Customer } from '../entity/customer'
import { RepositoryInterface } from '../../@shared/repository/repository.interface'

export interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
