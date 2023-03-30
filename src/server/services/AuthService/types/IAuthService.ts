import {IUserEntity} from "../../../models/UserModel/types/IUserEntity.js";

export interface IAuthService {
  generateToken(user: IUserEntity): string
}