import * as yup from 'yup'
import { ValidatorInterface } from '../../@shared/validator/validator.interface'
import { Product } from '../entity/product'

export class ProductYupValidator implements ValidatorInterface<Product> {
  validate(entity: Product): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('Id is required'),
          name: yup.string().required('Name is required'),
          price: yup.number().min(0, 'Price must be greater than zero'),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
            price: entity.price,
          },
          {
            abortEarly: false,
          }
        )
    } catch (e) {
      const error = e as yup.ValidationError
      error.errors.forEach(message => {
        entity.notification.addError({
          message,
          context: 'product',
        })
      })
    }
  }
}
