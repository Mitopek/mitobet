import {IUserEntity} from "../../../models/UserModel/types/IUserEntity.js";

export interface IAuthService {
  generateToken(user: IUserEntity): string
  register(mail: string, password: string): Promise<void>
  login(mail: string, password: string): Promise<IUserEntity>
}