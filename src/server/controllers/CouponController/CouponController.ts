import {ICouponController} from "./types/ICouponController.js";
import {inject, injectable} from "inversify";
import {InterfaceTypes} from "../../types/InterfaceTypes.js";
import {IUserRepository} from "../../repositories/UserRepository/types/IUserRepository.js";
import {Request, Response} from "express";
import {IApiRequest} from "../../types/IApiRequest.js";
import {IApiResponse} from "../../types/IApiResponse.js";
import {ICouponRepository} from "../../repositories/CouponRepository/types/ICouponRepository.js";
import { Configuration, OpenAIApi } from "openai";
import {sports} from "../../services/OddsService/enum/Sports.js";


@injectable()
export class CouponController implements ICouponController {
  constructor(
    @inject(InterfaceTypes.repositories.UserRepository) private userRepository: IUserRepository,
    @inject(InterfaceTypes.repositories.CouponRepository) private couponRepository: ICouponRepository,
  ) {}

  async getCoupons(req: IApiRequest, res: IApiResponse): Promise<Response> {
    const userId = req.authenticationData.userId
    const user = await this.userRepository.findUserById(userId)
    if(!user?.subscriptionExpiresAt || user.subscriptionExpiresAt < new Date()) {
      return res.sendFailResponse(['User does not have a subscription'], 401)
    }
    const coupons = await this.couponRepository.findFutureCoupons()
    return res.sendSuccessResponse({
      coupons,
    })
  }

  async createCoupon(req: IApiRequest, res: IApiResponse): Promise<Response> {
    const {imageUrl, description, startDate} = req.body
    const userId = req.authenticationData.userId
    const user = await this.userRepository.findUserById(userId)
    if(!user?.isAdmin) {
      return res.sendFailResponse(['No permissions'], 401)
    }
    const coupon = await this.couponRepository.createCoupon({
      imageUrl,
      description,
      startDate,
    })
    return res.sendSuccessResponse({
      coupon,
    })
  }

  async deleteCoupon(req: IApiRequest, res: IApiResponse): Promise<Response> {
    const {couponId} = req.params
    const userId = req.authenticationData.userId
    const user = await this.userRepository.findUserById(userId)
    if(!user?.isAdmin) {
      return res.sendFailResponse(['No permissions'], 401)
    }
    await this.couponRepository.deleteCouponById(couponId)
    return res.sendSuccessResponse(null)
  }
}