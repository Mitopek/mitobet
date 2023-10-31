import {ILoginStrategy} from "../ILoginStrategy.js";
import {LoginType} from "../enum/LoginType.js";
import {ILoginPayloadMap} from "../types/ILoginPayloadMap.js";
import {inject, injectable} from "inversify";
import {InterfaceTypes} from "../../../types/InterfaceTypes.js";
import {IUserRepository} from "../../../repositories/UserRepository/types/IUserRepository.js";
import {IUserEntity} from "../../../models/UserModel/types/IUserEntity.js";
import {IAuthService} from "../types/IAuthService.js";
import {IPasswordService} from "../../PasswordService/types/IPasswordService.js";

@injectable()
export class LocalLoginStrategy implements ILoginStrategy {
  constructor(
    @inject(InterfaceTypes.repositories.UserRepository) private userRepository: IUserRepository,
    @inject(InterfaceTypes.services.AuthService) private authService: IAuthService,
    @inject(InterfaceTypes.services.PasswordService) private passwordService: IPasswordService,
  ) {}

  async login(type: LoginType.LOCAL, payload: ILoginPayloadMap[LoginType.LOCAL]): Promise<IUserEntity> {
    const {mail, password} = payload
    if(!mail || !password) {
      throw new Error('Brak wymaganych danych logowania.')
    }
    const user = await this.userRepository.findUserByMailAndLoginType(mail, type)
    if(!user) {
      throw new Error('Nieprawidłowe dane logowania.')
    }
    const isPasswordValid = await this.passwordService.comparePassword(password, user.password)
    if(!isPasswordValid) {
      throw new Error('Nieprawidłowe dane logowania.')
    }
    return user
  }
}