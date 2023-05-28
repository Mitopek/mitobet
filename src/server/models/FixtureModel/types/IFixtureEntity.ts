import {IEntity} from "../../types/IEntity.js";

export interface IFixtureEntity extends IEntity{
  startDate: Date,
  imageUrl: string,
  description?: string,
}