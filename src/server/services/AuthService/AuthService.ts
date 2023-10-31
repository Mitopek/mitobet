import {IAuthService} from "./types/IAuthService.js";
import jwt from 'jsonwebtoken'
import {IUserEntity} from "../../models/UserModel/types/IUserEntity.js";
import {inject, injectable} from "inversify";
import {InterfaceTypes} from "../../types/InterfaceTypes.js";
import {IMailService} from "../MailService/types/IMailService.js";
import {IPasswordService} from "../PasswordService/types/IPasswordService.js";
import {IUserRepository} from "../../repositories/UserRepository/types/IUserRepository.js";
import {ILoginStrategy} from "./ILoginStrategy";
import {LoginType} from "./enum/LoginType.js";
import {ILoginPayloadMap} from "./types/ILoginPayloadMap";

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(InterfaceTypes.services.MailService) private mailService: IMailService,
    @inject(InterfaceTypes.services.PasswordService) private passwordService: IPasswordService,
    @inject(InterfaceTypes.repositories.UserRepository) private userRepository: IUserRepository,
    @inject(InterfaceTypes.factories.ILoginStrategyFactory) private loginStrategyFactory: (type: LoginType) => ILoginStrategy,

  ) {
  }

  generateToken(user: IUserEntity): string {
    return jwt.sign({
      userId: user.id,
      isAdmin: user.isAdmin,
    }, process.env.JWT_KEY, {
      expiresIn: '1h'
    })
  }

  async register(mail: string, password: string): Promise<void> {
    if(!this.mailService.validateMail(mail)) {
      throw new Error('Nieprawidłowy mail.')
    }
    if(!this.passwordService.validatePassword(password)) {
      throw new Error('Nieprawidłowe hasło.')
    }
    const user = await this.userRepository.findUserByMail(mail)
    if(user) {
      throw new Error('Podany mail jest już używany.')
    }
    const hashedPassword = await this.passwordService.hashPassword(password)
    await this.userRepository.createUser({
      mail,
      password: hashedPassword,
      isAdmin: false,
      loginType: LoginType.LOCAL,
    })
  }

  async changePassword(userId: string, oldPassword: string, password: string): Promise<void> {
    const user = await this.userRepository.findUserById(userId)
    const isPasswordValid = await this.passwordService.comparePassword(oldPassword, user.password)
    if(!isPasswordValid) {
      throw new Error('Nieprawidłowe dane logowania.')
    }
    if(!this.passwordService.validatePassword(password)) {
      throw new Error('Nieprawidłowe hasło.')
    }
    console.info(password)
    const hashedPassword = await this.passwordService.hashPassword(password)
    await this.userRepository.updateUserById(user.id, {
      password: hashedPassword,
    })
  }

  async login(type: LoginType, payload: ILoginPayloadMap[LoginType]): Promise<IUserEntity> {
    const strategy = this.loginStrategyFactory(type)
    return strategy.login(type, payload)
  }
}