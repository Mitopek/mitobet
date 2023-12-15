import {IPaymentEntity} from "../../../models/PaymentModel/types/IPaymentEntity.js";
import {PaymentStatus} from "../../../models/PaymentModel/enum/PaymentStatus.js";

export interface IPaymentRepository{
  createPayment(subscriptionId: number, userId: string): Promise<IPaymentEntity>
  updatePayment(id: number, status: PaymentStatus, externalId: string): Promise<void>
  findPaymentById(id: string): Promise<IPaymentEntity>
  findPayments(): Promise<IPaymentEntity[]>
}