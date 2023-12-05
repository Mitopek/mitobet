import {IPasswordService} from "./types/IPasswordService.js";
import bcrypt from 'bcrypt'
import {injectable} from "inversify";

@injectable()
export class PasswordService implements IPasswordService{
  saltRounds = 11

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(password, salt);
  }

  comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  validatePassword(password: string): boolean {
    if(!password) {
      return false
    }
    if(password.length < 8) {
      return false
    }
    return /\d/.test(password);
  }
}