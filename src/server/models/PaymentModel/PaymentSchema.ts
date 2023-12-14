import {Schema} from "mongoose";
import {IPaymentEntity} from "./types/IPaymentEntity.js";

export const PaymentSchema = new Schema<IPaymentEntity>({
  subscriptionId: {
    type: Schema.Types.Number,
    required: true,
  },
  userId: {
    type: Schema.Types.String,
    required: true,
  },
  status: {
    type: Schema.Types.String,
    required: false,
  },
  externalId: {
    type: Schema.Types.Number,
    required: true,
  },
}, {
  timestamps: true,
})