import {IVerificationService} from "./types/IVerificationService.js";
import {inject, injectable} from "inversify";
import {InterfaceTypes} from "../../types/InterfaceTypes.js";
import {IVerificationRepository} from "../../repositories/VerificationRepository/types/IVerificationRepository.js";
import * as randomstring from 'randomstring'
import {IUserRepository} from "../../repositories/UserRepository/types/IUserRepository.js";
import {IMailService} from "../MailService/types/IMailService.js";

@injectable()
export class VerificationService implements IVerificationService {
  constructor(
    @inject(InterfaceTypes.repositories.VerificationRepository) private verificationRepository: IVerificationRepository,
    @inject(InterfaceTypes.repositories.UserRepository) private userRepository: IUserRepository,
    @inject(InterfaceTypes.services.MailService) private mailService: IMailService,
  ) {
  }

  async sendVerificationMail(userId: string): Promise<void> {
    const secret = `${randomstring.generate(32)}${new Date().getTime()}`
    const verification =  await this.verificationRepository.createVerification({
      userId,
      secret,
      expiresAt: null,
      fulfilledAt: null,
    })
    await this.userRepository.updateUserById(userId, {
      verificationId: verification.id,
    })
    const user = await this.userRepository.findUserById(userId)
    await this.mailService.sendMail(user.mail, 'Zweryfikuj swój e-mail', `Kliknij <a href="${process.env.CLIENT_HOST}/verify/${verification.secret}">tutaj</a> aby zweryfikować swój e-mail.`)
  }

  async sendResetPasswordMail(userId: string): Promise<void> {
    const secret = `${randomstring.generate(32)}${new Date().getTime()}`
    const verification =  await this.verificationRepository.createVerification({
      userId,
      secret,
      expiresAt: new Date(new Date().getTime() + 1000 * 60 * 60),
      fulfilledAt: null,
    })
    const user = await this.userRepository.findUserById(userId)
    await this.mailService.sendMail(user.mail, 'Zresetuj swoje hasło', `Kliknij <a href="${process.env.CLIENT_HOST}/reset-password/${verification.secret}">tutaj</a> aby zresetować swoje hasło.`)
  }
}