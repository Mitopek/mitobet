import {IPaymentRepository} from "./types/IPaymentRepository.js";
import {inject, injectable} from "inversify";
import {IPaymentEntity} from "../../models/PaymentModel/types/IPaymentEntity.js";
import {Model} from "mongoose";
import {InterfaceTypes} from "../../types/InterfaceTypes.js";
import {PaymentStatus} from "../../models/PaymentModel/enum/PaymentStatus.js";

@injectable()
export class PaymentRepository implements IPaymentRepository{
  constructor(
    @inject(InterfaceTypes.models.PaymentModel) private paymentModel: Model<IPaymentEntity>,
  ) {
  }

  async createPayment(subscriptionId: number, userId: string, externalId: number): Promise<IPaymentEntity> {
    return this.paymentModel.create({
      subscriptionId,
      userId,
      externalId,
    })
  }

  async updatePaymentStatus(paymentId: number, status: PaymentStatus): Promise<void> {
    await this.paymentModel.updateOne({
      _id: paymentId,
    }, {
      $set: {
        status,
      }
    })
  }

  async findPaymentByExternalId(id: number): Promise<IPaymentEntity> {
    return this.paymentModel.findOne({
      externalId: id,
    })
  }

  async findPayments(): Promise<IPaymentEntity[]> {
    return this.paymentModel.find()
  }
}