import { Product } from '../entity/product'
import { RepositoryInterface } from '../../@shared/repository/repository.interface'

export interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}
