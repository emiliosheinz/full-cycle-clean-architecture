export interface InputListCustomerDto {}
export interface OutputListCustomerDto {
  customers: {
    id: string
    name: string
    address: {
      city: string
      number: number
      state: string
      street: string
      zip: string
    }
  }[]
}
