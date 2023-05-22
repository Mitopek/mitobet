import {IEntity} from "../../types/IEntity.js";

export interface ICountryEntity extends IEntity{
  name: string,
  code: string,
  flag: string,
}