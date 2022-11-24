import { Event } from "./Event";

export interface FunctionInterface {

  //Dia de la funcion
  day: string,

  //hora de la funcion
  hour: string,

  //Evento al que pertenece la funcion
  event: Event,

  //Numero total de espacios
  totalSpaces: number,

  //Numero de espacios disponibles
  availableSpaces: number,

  //Si la funcion esta disponible o no
  active: boolean
}