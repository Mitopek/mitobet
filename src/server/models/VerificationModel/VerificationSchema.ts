import {Schema} from 'mongoose'
import {IVerificationEntity} from "./types/IVerificationEntity.js";

export const VerificationSchema = new Schema<IVerificationEntity>({
  userId: {
    type: Schema.Types.String,
  },
  secret: {
    type: Schema.Types.String,
    required: true,
  },
  expiresAt: {
    type: Schema.Types.Date,
    required: false,
  },
  fulfilledAt: {
    type: Schema.Types.Date,
    required: false,
  },
})