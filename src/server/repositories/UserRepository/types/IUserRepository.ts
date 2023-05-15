import {IUserEntity} from "../../../models/UserModel/types/IUserEntity.js";
import {ICreateUserProperties} from "../../../models/UserModel/types/ICreateUserProperties.js";

export interface IUserRepository {
  createUser(user: ICreateUserProperties): Promise<IUserEntity>
  findUserByMail(mail: IUserEntity['mail']): Promise<IUserEntity>
  findUserById(id: IUserEntity['id']): Promise<IUserEntity>
}