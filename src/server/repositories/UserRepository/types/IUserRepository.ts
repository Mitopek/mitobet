import {IUserEntity} from "../../../models/UserModel/types/IUserEntity.js";

export interface IUserRepository {
  createUser(user: Partial<IUserEntity>): Promise<IUserEntity>
  findUserByMail(mail: IUserEntity['mail']): Promise<IUserEntity>
}