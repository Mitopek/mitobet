import {IUserEntity} from "../../../models/UserModel/types/IUserEntity.js";

export interface IAuthService {
  generateToken(user: IUserEntity): string
  changePassword(userId: string, oldPassword: string, password: string): Promise<void>
  register(mail: string, password: string): Promise<void>
  login(mail: string, password: string): Promise<IUserEntity>
}