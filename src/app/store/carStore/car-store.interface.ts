import { ICar } from "../../models/car.interface";

export interface ICarStore{
  cars: ICar[],
  isDeleting?: boolean,
}