import {IAuthService} from "./types/IAuthService.js";
import jwt from 'jsonwebtoken'
import {IUserEntity} from "../../models/UserModel/types/IUserEntity.js";
import {injectable} from "inversify";

@injectable()
export class AuthService implements IAuthService {
  generateToken(user: IUserEntity): string {
    return jwt.sign({
      userId: user.id
    }, process.env.JWT_KEY, {
      expiresIn: '1h'
    })
  }
}