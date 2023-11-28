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
import {ILoginPayloadMap} from "./types/ILoginPayloadMap.js";
import {IVerificationService} from "../VerificationService/types/IVerificationService.js";
import {IVerificationRepository} from "../../repositories/VerificationRepository/types/IVerificationRepository.js";

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(InterfaceTypes.services.MailService) private mailService: IMailService,
    @inject(InterfaceTypes.services.PasswordService) private passwordService: IPasswordService,
    @inject(InterfaceTypes.repositories.UserRepository) private userRepository: IUserRepository,
    @inject(InterfaceTypes.factories.LoginStrategyFactory) private loginStrategyFactory: (type: LoginType) => ILoginStrategy,
    @inject(InterfaceTypes.services.VerificationService) private verificationService: IVerificationService,
    @inject(InterfaceTypes.repositories.VerificationRepository) private verificationRepository: IVerificationRepository,
  ) {
  }

  generateToken(user: IUserEntity): string {
    return jwt.sign({
      userId: user.id,
      type: user.loginType,
      hasAcceptedRegulations: !!user.acceptedRegulationsDate,
      hasAcceptedPrivatePolicy: !!user.acceptedPrivatePolicyDate,
      isAdmin: user.isAdmin,
    }, process.env.JWT_KEY, {
      expiresIn: '1h'
    })
  }

  async register(mail: string, password: string, hasAcceptedRegulations: boolean, hasAcceptedPrivatePolicy: boolean): Promise<void> {
    if(!hasAcceptedRegulations) {
      throw new Error('Musisz zaakceptować regulamin i politykę prywatności serwisu.')
    }
    if(!hasAcceptedPrivatePolicy) {
      throw new Error('Musisz zaakceptować regulamin i politykę prywatności serwisu.')
    }
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
    const createdUser = await this.userRepository.createUser({
      mail,
      password: hashedPassword,
      isAdmin: false,
      loginType: LoginType.LOCAL,
      acceptedRegulationsDate: new Date(),
      acceptedPrivatePolicyDate: new Date(),
    })
    await this.verificationService.sendVerificationMail(createdUser.id)
  }

  async changePassword(userId: string, oldPassword: string, password: string): Promise<void> {
    const user = await this.userRepository.findUserById(userId)
    if(!user || user.loginType !== LoginType.LOCAL) {
      throw new Error('Nie jesteś lokalnym użytkownikiem.')
    }
    const isPasswordValid = await this.passwordService.comparePassword(oldPassword, user.password)
    if(!isPasswordValid) {
      throw new Error('Nieprawidłowe dane logowania.')
    }
    if(!this.passwordService.validatePassword(password)) {
      throw new Error('Nieprawidłowe hasło.')
    }
    const hashedPassword = await this.passwordService.hashPassword(password)
    await this.userRepository.updateUserById(user.id, {
      password: hashedPassword,
    })
  }

  async forgotPassword(mail: string): Promise<void> {
    const user = await this.userRepository.findUserByMail(mail)
    if(!user || user.loginType !== LoginType.LOCAL) {
      return
    }
    await this.verificationService.sendResetPasswordMail(user.id)
  }

  async resetPassword(password: string, secret: string): Promise<void> {
    if(!this.passwordService.validatePassword(password)) {
      throw new Error('Nieprawidłowe hasło.')
    }
    const verification = await this.verificationRepository.findVerificationBySecret(secret)
    if(!verification || verification.fulfilledAt) {
      throw new Error('Nieprawidłowy link.')
    }
    if(verification.expiresAt < new Date()) {
      throw new Error('Link wygasł.')
    }
    const hashedPassword = await this.passwordService.hashPassword(password)
    await this.userRepository.updateUserById(verification.userId, {
      password: hashedPassword,
    })
  }

  async login(type: LoginType, payload: ILoginPayloadMap[LoginType]): Promise<IUserEntity> {
    const strategy = this.loginStrategyFactory(type)
    return strategy.login(type, payload)
  }
}