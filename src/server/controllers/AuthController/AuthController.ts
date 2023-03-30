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
    const hashedPassword = await this.passwordService.hashPassword(password)
    await this.userRepository.createUser({
      mail,
      password: hashedPassword,
    })
    return res.sendSuccessResponse(null)
  }

  async login(req: IApiRequest, res: IApiResponse): Promise<Response> {
    const {mail, password} = req.body
    const user = await this.userRepository.findUserByMail(mail)
    if(!user) {
      return res.sendFailResponse('User not found', 404)
    }
    const isPasswordValid = await this.passwordService.comparePassword(password, user.password)
    if(!isPasswordValid) {
      return res.sendFailResponse('User not found', 404)
    }
    const token = this.authService.generateToken(user)
    res.cookie('access_token', token, {
      // httpOnly: true,
      maxAge: 1000 * 3600,
      //secure: true,
      //sameSite: 'lax',
    })
    return res.sendSuccessResponse(null)
  }
}