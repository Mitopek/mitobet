import {IPaymentEntity} from "../../../models/PaymentModel/types/IPaymentEntity.js";
import {PaymentStatus} from "../../../models/PaymentModel/enum/PaymentStatus.js";

export interface IPaymentRepository{
  createPayment(subscriptionId: number, userId: string): Promise<IPaymentEntity>
  updatePaymentStatus(id: string, status: PaymentStatus): Promise<void>
  findPaymentByExternalId(id: string): Promise<IPaymentEntity>
  findPayments(): Promise<IPaymentEntity[]>
}