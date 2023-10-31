import {LoginType} from "../../../services/AuthService/enum/LoginType";

export interface ICreateUserProperties{
  mail: string,
  password: string,
  isAdmin: boolean
  loginType: LoginType,
  subscriptionExpiresAt?: Date
}