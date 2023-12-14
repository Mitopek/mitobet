import {IPaymentEntity} from "../../../models/PaymentModel/types/IPaymentEntity.js";
import {PaymentStatus} from "../../../models/PaymentModel/enum/PaymentStatus.js";

export interface IPaymentRepository{
  createPayment(subscriptionId: number, userId: string): Promise<IPaymentEntity>
  updatePaymentStatus(paymentId: number, status: PaymentStatus): Promise<void>
  findPaymentById(id: IPaymentEntity['id']): Promise<IPaymentEntity>
}