import {IPaymentEntity} from "../../../models/PaymentModel/types/IPaymentEntity.js";
import {PaymentStatus} from "../../../models/PaymentModel/enum/PaymentStatus.js";

export interface IPaymentRepository{
  createPayment(subscriptionId: number, userId: string, externalId: number): Promise<IPaymentEntity>
  updatePaymentStatus(externalId: number, status: PaymentStatus): Promise<void>
  findPaymentByExternalId(id: number): Promise<IPaymentEntity>
  findPayments(): Promise<IPaymentEntity[]>
}