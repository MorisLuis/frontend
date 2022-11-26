import { FunctionInterface } from "./Function";

export interface SpaceInterface {
  _id: string
  function: FunctionInterface,
  number: string,
  isAvailable: boolean,
  section: 'A' | 'B',
  price: number
}