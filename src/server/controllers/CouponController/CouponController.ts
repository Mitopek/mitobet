import {ICouponController} from "./types/ICouponController.js";
import {inject, injectable} from "inversify";
import {InterfaceTypes} from "../../types/InterfaceTypes.js";
import {IUserRepository} from "../../repositories/UserRepository/types/IUserRepository.js";
import {Request, Response} from "express";
import {IPasswordService} from "../../services/PasswordService/types/IPasswordService.js";
import {IAuthService} from "../../services/AuthService/types/IAuthService.js";
import {IApiRequest} from "../../types/IApiRequest.js";
import {IApiResponse} from "../../types/IApiResponse.js";

@injectable()
export class CouponController implements ICouponController {
  constructor(
    @inject(InterfaceTypes.repositories.UserRepository) private userRepository: IUserRepository,
    @inject(InterfaceTypes.services.PasswordService) private passwordService: IPasswordService,
    @inject(InterfaceTypes.services.AuthService) private authService: IAuthService,
  ) {}

  async getCoupons(req: IApiRequest, res: IApiResponse): Promise<Response> {
    return res.sendSuccessResponse('ELOOO')
  }
}