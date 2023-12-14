import {IEntity} from "../../types/IEntity.js";
import {PaymentStatus} from "../enum/PaymentStatus.js";

export interface IPaymentEntity extends IEntity{
  subscriptionId: number,
  userId: string,
  status?: PaymentStatus,
  externalId: number,
}