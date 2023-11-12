import {IEntity} from "../../types/IEntity.js";

export interface IVerificationEntity extends IEntity{
  userId: string,
  secret: string,
  expiresAt: Date,
  fulfilledAt: Date,
}