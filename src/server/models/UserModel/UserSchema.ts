import {Schema} from 'mongoose'
import {IUserEntity} from "./types/IUserEntity.js";
export const UserSchema = new Schema<IUserEntity>({
  mail: {
    type: Schema.Types.String,
    required: true,
  },
  password: {
    type: Schema.Types.String,
    required: false,
  },
  isAdmin: {
    type: Schema.Types.Boolean,
    required: true,
  },
  loginType: {
    type: Schema.Types.String,
    required: true,
  },
  subscriptionExpiresAt: {
    type: Schema.Types.Date,
    required: false,
  },
  verificationId: {
    type: Schema.Types.String,
    required: false,
  }
})