import { User } from "./User"

export interface Order {
  name: string,
  email: string,
  phone: string
  user: User,
  number: string,
  spaces: any[],
  subTotal: number
  total: number
  paymentMethod: string,
}