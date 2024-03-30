import { Request, Response, Router } from 'express'
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from '../../../usecase/product/create/create-product.dto'
import { ProductRepository } from '../../product/repository/squelize/product.repository'
import { CreateProductUseCase } from '../../../usecase/product/create/create-product.usecase'
import { ListProductUseCase } from '../../../usecase/product/list/list-product.usecase'
import { FindProductUseCase } from '../../../usecase/product/find/find-product.usecase'
import { UpdateProductUseCase } from '../../../usecase/product/update/update-product.usecase'

export const productRoute = Router()

productRoute.post(
  '/',
  async (req: Request, res: Response<OutputCreateProductDto | unknown>) => {
    try {
      const input: InputCreateProductDto = {
        name: req.body.name,
        price: req.body.price,
      }
      const productRepository = new ProductRepository()
      const createProductUseCase = new CreateProductUseCase(productRepository)
      const output = await createProductUseCase.execute(input)
      res.status(200).send(output)
    } catch (error) {
      res.status(400).send(error)
    }
  }
)

productRoute.get('/', async (req: Request, res: Response) => {
  try {
    const productRepository = new ProductRepository()
    const listProductsUseCase = new ListProductUseCase(productRepository)
    const products = await listProductsUseCase.execute({})
    res.status(200).send(products)
  } catch (error) {
    res.status(400).send(error)
  }
})

productRoute.get('/:id', async (req: Request, res: Response) => {
  try {
    const productRepository = new ProductRepository()
    const findProductUseCase = new FindProductUseCase(productRepository)
    const product = await findProductUseCase.execute({ id: req.params.id })
    res.status(200).send(product)
  } catch (error) {
    res.status(404).send(error)
  }
})

productRoute.put('/:id', async (req: Request, res: Response) => {
  try {
    const productRepository = new ProductRepository()
    const updateProductUseCase = new UpdateProductUseCase(productRepository)
    const product = await updateProductUseCase.execute({
      id: req.params.id,
      ...req.body,
    })
    res.status(200).send(product)
  } catch (error) {
    res.status(404).send(error)
  }
})
