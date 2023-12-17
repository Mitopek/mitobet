import {Schema} from 'mongoose'
import {ICouponEntity} from "./types/ICouponEntity.js";

export const CouponSchema = new Schema<ICouponEntity>({
  imageUrl: {
    type: Schema.Types.String,
    required: true,
  },
  description: {
    type: Schema.Types.String,
    required: false,
  },
  startDate: {
    type: Schema.Types.Date,
    required: false,
  },
  risk: {
    type: Schema.Types.Number,
  }
}, {
  timestamps: true,
})