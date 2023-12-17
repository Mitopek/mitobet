import {IEntity} from "../../types/IEntity.js";

export interface ICouponEntity extends IEntity{
  startDate: Date,
  imageUrl: string,
  description?: string,
  risk: number,
}