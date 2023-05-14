import {IAuthController} from "./types/IAuthController.js";
import {inject, injectable} from "inversify";
import {InterfaceTypes} from "../../types/InterfaceTypes.js";
import {IUserRepository} from "../../repositories/UserRepository/types/IUserRepository.js";
import {Request, Response} from "express";
import {IPasswordService} from "../../services/PasswordService/types/IPasswordService.js";
import {IAuthService} from "../../services/AuthService/types/IAuthService.js";
import {IApiRequest} from "../../types/IApiRequest.js";
import {IApiResponse} from "../../types/IApiResponse.js";

@injectable()
export class AuthController implements IAuthController {
  constructor(
    @inject(InterfaceTypes.repositories.UserRepository) private userRepository: IUserRepository,
    @inject(InterfaceTypes.services.PasswordService) private passwordService: IPasswordService,
    @inject(InterfaceTypes.services.AuthService) private authService: IAuthService,
  ) {}

  async register(req: IApiRequest, res: IApiResponse): Promise<Response> {
    const {mail, password} = req.body
    try {
      await this.authService.register(mail, password)
    } catch (e) {
      return res.sendFailResponse([e.message], 400)
    }
    return res.sendSuccessResponse(null)
  }

  async login(req: IApiRequest, res: IApiResponse): Promise<Response> {
    const {mail, password} = req.body
    let user = null
    try {
      user = await this.authService.login(mail, password)
    } catch (e) {
      return res.sendFailResponse([e.message], 401)
    }
    const token = this.authService.generateToken(user)
    res.cookie('access_token', token, {
      httpOnly: false,
      maxAge: 1000 * 3600,
      secure: true,
      sameSite: 'none',
    })
    return res.sendSuccessResponse(null)
  }
}