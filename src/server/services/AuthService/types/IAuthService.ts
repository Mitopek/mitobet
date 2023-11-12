import {IUserEntity} from "../../../models/UserModel/types/IUserEntity.js";
import {LoginType} from "../enum/LoginType.js";
import {ILoginPayloadMap} from "./ILoginPayloadMap";

export interface IAuthService {
  generateToken(user: IUserEntity): string
  changePassword(userId: string, oldPassword: string, password: string): Promise<void>
  register(mail: string, password: string): Promise<void>
  login(type: LoginType, payload: ILoginPayloadMap[LoginType]): Promise<IUserEntity>
  forgotPassword(mail: string): Promise<void>
  resetPassword(password: string, secret: string): Promise<void>
}