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

  async createPayment(subscriptionId: number, userId: string): Promise<IPaymentEntity> {
    return this.paymentModel.create({
      subscriptionId,
      userId,
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

  async findPaymentById(id: IPaymentEntity['id']): Promise<IPaymentEntity> {
    return this.paymentModel.findOne({
      _id: id,
    })
  }
}