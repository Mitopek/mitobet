import {IUserEntity} from "../../../models/UserModel/types/IUserEntity.js";
import {ICreateUserProperties} from "../../../models/UserModel/types/ICreateUserProperties.js";
import {LoginType} from "../../../services/AuthService/enum/LoginType";

export interface IUserRepository {
  createUser(user: ICreateUserProperties): Promise<IUserEntity>
  findUserByMail(mail: IUserEntity['mail']): Promise<IUserEntity>
  findUserByMailAndLoginType(mail: IUserEntity['mail'], loginType: LoginType): Promise<IUserEntity>
  findUserById(id: IUserEntity['id']): Promise<IUserEntity>
  updateUserById(id: IUserEntity['id'], user: Partial<IUserEntity>): Promise<void>
  findUsersByDateRange(from: Date, to: Date): Promise<IUserEntity[]>
}