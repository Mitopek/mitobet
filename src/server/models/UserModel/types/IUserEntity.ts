import {IEntity} from "../../types/IEntity.js";
import {LoginType} from "../../../services/AuthService/enum/LoginType";

export interface IUserEntity extends IEntity{
  mail: string,
  password?: string,
  isAdmin: boolean,
  loginType: LoginType,
  subscriptionExpiresAt?: Date,
  verificationId?: string,
  acceptedRegulationsDate: Date,
  acceptedPrivatePolicyDate: Date,
}