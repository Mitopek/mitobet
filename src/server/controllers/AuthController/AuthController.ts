import {IAuthController} from "./types/IAuthController.js";
import {inject, injectable} from "inversify";
import {InterfaceTypes} from "../../types/InterfaceTypes.js";
import {IUserRepository} from "../../repositories/UserRepository/types/IUserRepository.js";
import {Request, Response} from "express";
import {IPasswordService} from "../../services/PasswordService/types/IPasswordService.js";
import {IAuthService} from "../../services/AuthService/types/IAuthService.js";
import {IApiRequest} from "../../types/IApiRequest.js";
import {IApiResponse} from "../../types/IApiResponse.js";
import {LoginType} from "../../services/AuthService/enum/LoginType.js";

@injectable()
export class AuthController implements IAuthController {
  constructor(
    @inject(InterfaceTypes.repositories.UserRepository) private userRepository: IUserRepository,
    @inject(InterfaceTypes.services.PasswordService) private passwordService: IPasswordService,
    @inject(InterfaceTypes.services.AuthService) private authService: IAuthService,
  ) {}

  async register(req: IApiRequest, res: IApiResponse): Promise<Response> {
    const {mail, password, hasAcceptedRegulations, hasAcceptedPrivatePolicy} = req.body
    try {
      await this.authService.register(mail, password, hasAcceptedRegulations, hasAcceptedPrivatePolicy)
    } catch (e) {
      return res.sendFailResponse([e.message], 400)
    }
    return res.sendSuccessResponse(null)
  }

  async changePassword(req: IApiRequest, res: IApiResponse): Promise<Response> {
    const {oldPassword, password} = req.body
    const userId = req.authenticationData.userId
    try {
      await this.authService.changePassword(userId, oldPassword, password)
    } catch (e) {
      return res.sendFailResponse([e.message], 400)
    }
    return res.sendSuccessResponse(null)
  }

  async forgotPassword(req: IApiRequest, res: IApiResponse): Promise<Response> {
    const {mail} = req.body
    await this.authService.forgotPassword(mail)
    return res.sendSuccessResponse(null)
  }

  async resetPassword(req: IApiRequest, res: IApiResponse): Promise<Response> {
    const {password, secret} = req.body
    try {
      await this.authService.resetPassword(password, secret)
    } catch (e) {
      return res.sendFailResponse([e.message], 400)
    }
    return res.sendSuccessResponse(null)
  }

  async acceptConsents(req: IApiRequest, res: IApiResponse): Promise<Response> {
    const userId = req.authenticationData.userId
    const {hasAcceptedRegulations, hasAcceptedPrivatePolicy} = req.body
    if(!hasAcceptedRegulations || !hasAcceptedPrivatePolicy) {
      return res.sendFailResponse(['Musisz zaakceptować regulamin i politykę prywatności serwisu.'], 401)
    }
    const user = await this.userRepository.findUserById(userId)
    if(user.acceptedPrivatePolicyDate && user.acceptedRegulationsDate) {
      return res.sendFailResponse(['Regulamin i polityka prywatności zostały już zaakceptowane.'], 401)
    }
    await this.userRepository.updateUserById(userId, {
      acceptedPrivatePolicyDate: new Date(),
      acceptedRegulationsDate: new Date(),
    })
    return res.sendSuccessResponse(null)
  }

  async login(req: IApiRequest, res: IApiResponse): Promise<Response> {
    const {mail, password, facebookCode, googleCode, type} = req.body
    let user = null
    try {
      if(type === LoginType.LOCAL) {
        user = await this.authService.login(type, {
          mail,
          password,
        })
      } else if(type === LoginType.FACEBOOK) {
        user = await this.authService.login(type, {
          code: facebookCode,
        })
      } else if(type === LoginType.GOOGLE) {
        user = await this.authService.login(type, {
          code: googleCode,
        })
      }
    } catch (e) {
      return res.sendFailResponse([e.message], 401)
    }
    if(!user) {
      return res.sendFailResponse(['Nieprawidłowe dane logowania.'], 401)
    }
    const token = this.authService.generateToken(user)
    //TODO flags itp
    res.cookie('access_token', token, {
      httpOnly: false,
      maxAge: 1000 * 3600,
      secure: true,
      sameSite: 'none',
    })
    return res.sendSuccessResponse({
      user: {
        mail: user.mail,
        subscriptionExpiresAt: user?.subscriptionExpiresAt || null,
        isAdmin: user.isAdmin,
        hasAcceptedConsents: !!user.acceptedPrivatePolicyDate && !!user.acceptedRegulationsDate,
      }
    })
  }

  async logout(req: IApiRequest, res: IApiResponse): Promise<Response> {
    res.clearCookie('access_token', {
      httpOnly: false,
      maxAge: 1000 * 3600,
      secure: true,
      sameSite: 'none',
    })
    return res.sendSuccessResponse(null)
  }
}