import { FunctionInterface } from "./Function";

export interface SpaceInterface {
  function: FunctionInterface,
  number: string,
  isAvailable: boolean,
  section: 'A' | 'B',
  price: number
}