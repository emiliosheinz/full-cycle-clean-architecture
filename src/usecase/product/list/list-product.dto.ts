export interface InputListProductDto {}

export interface OutputListProductDto {
  products: {
    id: string
    name: string
    price: number
  }[]
}
