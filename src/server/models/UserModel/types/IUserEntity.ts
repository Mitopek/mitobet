import {IEntity} from "../../types/IEntity.js";

export interface IUserEntity extends IEntity{
  mail: string,
  password: string,
}