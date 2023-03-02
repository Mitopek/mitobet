import {IAuthController} from "./types/IAuthController.js";
import {inject, injectable} from "inversify";
import {InterfaceTypes} from "../../types/InterfaceTypes.js";
import {IUserRepository} from "../../repositories/UserRepository/types/IUserRepository.js";
import {Request, Response} from "express";
import {IPasswordService} from "../../services/PasswordService/types/IPasswordService.js";

@injectable()
export class AuthController implements IAuthController {
  constructor(
    @inject(InterfaceTypes.repositories.UserRepository) private userRepository: IUserRepository,
    @inject(InterfaceTypes.services.PasswordService) private passwordService: IPasswordService,
  ) {}

  async register(req: Request, res: Response): Promise<Response> {
    const {mail, password} = req.body
    const hashedPassword = await this.passwordService.hashPassword(password)
    await this.userRepository.createUser({
      mail,
      password: hashedPassword,
    })
    return res.status(404).send(null)
  }

  async login(req: Request, res: Response): Promise<Response> {
    const {mail, password} = req.body
    const user = await this.userRepository.findUserByMail(mail)
    if(!user) {
      return res.status(404).send(null)
    }
    console.info(user)
    const isPasswordValid = await this.passwordService.comparePassword(password, user.password)
    if(!isPasswordValid) {
      return res.status(403).send(null)
    }
    return res.status(200).send(null)
  }
}