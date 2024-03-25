import { ProductRepository } from '../../../infra/product/repository/squelize/product.repository'
import { InputFindProductDto, OutputFindProductDto } from './find-product.dto'

export class FindProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
    const product = await this.productRepository.find(input.id)
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    }
  }
}
