import {InterfaceTypes} from "../../types/InterfaceTypes.js";
import {inject, injectable} from "inversify";
import {IPaymentController} from "./types/IPaymentController.js";
import {IUserRepository} from "../../repositories/UserRepository/types/IUserRepository.js";
import {IApiRequest} from "../../types/IApiRequest.js";
import {IApiResponse} from "../../types/IApiResponse.js";
import {IPaymentRepository} from "../../repositories/PaymentRepository/types/IPaymentRepository.js";
import {Response} from "express";
import {PaymentStatus} from "../../models/PaymentModel/enum/PaymentStatus.js";
import * as crypto from "crypto";
import {IMailService} from "../../services/MailService/types/IMailService.js";

@injectable()
export class PaymentController implements IPaymentController {
  constructor(
    @inject(InterfaceTypes.repositories.UserRepository) private userRepository: IUserRepository,
    @inject(InterfaceTypes.repositories.PaymentRepository) private paymentRepository: IPaymentRepository,
    @inject(InterfaceTypes.services.MailService) private mailService: IMailService,
  ){

  }
  async createPayment(req: IApiRequest, res: IApiResponse): Promise<Response> {
    const password = process.env.HOTPAY_PASSWORD
    const secret = process.env.HOTPAY_SECRET
    const serviceName = process.env.HOTPAY_SERVICE_NAME
    const notificationUrl = process.env.HOTPAY_NOTIFICATION_URL
    const {userId} = req.authenticationData
    const {subscriptionId} = req.body
    const payment = await this.paymentRepository.createPayment(subscriptionId, userId)
    return res.sendSuccessResponse({
      id: payment.id,
      hash: await this.generateSHA256(`${password};${1};${serviceName};${notificationUrl};${payment.id};${secret}`)
    })
  }

  async handlePayment(req: IApiRequest, res: IApiResponse): Promise<Response> {
    const password = process.env.HOTPAY_PASSWORD
    const secret = process.env.HOTPAY_SECRET
    const {SEKRET, KWOTA, STATUS, ID_ZAMOWIENIA, ID_PLATNOSCI, SECURE, HASH} = req.body
    const expectedHash = await this.generateSHA256(`${password};${KWOTA};${ID_PLATNOSCI};${ID_ZAMOWIENIA};${STATUS};${secret}`)
    if(expectedHash !== HASH){
      return res.sendSuccessResponse('Nope')
    }
    await this.paymentRepository.updatePayment(ID_ZAMOWIENIA, STATUS, ID_PLATNOSCI)
    if(STATUS === PaymentStatus.SUCCESS){
      const payment = await this.paymentRepository.findPaymentById(ID_ZAMOWIENIA)
      const user = await this.userRepository.findUserById(payment.userId)
      const subscriptionExpiresAt = user.subscriptionExpiresAt || new Date()
      let subscriptionDays = 30
      if(payment.subscriptionId === 2){
        subscriptionDays = 183
      }
      if(payment.subscriptionId === 3){
        subscriptionDays = 366
      }
      const newSubscriptionExpiresAt = new Date(subscriptionExpiresAt.getTime() + subscriptionDays * 24 * 60 * 60 * 1000)
      await this.userRepository.updateUserById(user.id, {
        subscriptionExpiresAt: newSubscriptionExpiresAt
      })
      await this.mailService.sendMail(user.mail, 'Subskrypcja', `Twoja subskrypcja jest już aktywna.`)
    }
    return res.sendSuccessResponse(null)
  }

  private async generateSHA256(data: string): Promise<string> {
    const hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
  }
}