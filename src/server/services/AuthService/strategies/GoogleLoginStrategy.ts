import {ILoginStrategy} from "../ILoginStrategy.js";
import {LoginType} from "../enum/LoginType.js";
import {ILoginPayloadMap} from "../types/ILoginPayloadMap.js";
import {inject, injectable} from "inversify";
import {InterfaceTypes} from "../../../types/InterfaceTypes.js";
import {IUserRepository} from "../../../repositories/UserRepository/types/IUserRepository.js";
import {IUserEntity} from "../../../models/UserModel/types/IUserEntity.js";
import {IAuthService} from "../types/IAuthService.js";
import axios from "axios";

@injectable()
export class GoogleLoginStrategy implements ILoginStrategy {
  constructor(
    @inject(InterfaceTypes.repositories.UserRepository) private userRepository: IUserRepository,
    @inject(InterfaceTypes.services.AuthService) private authService: IAuthService,
  ) {}

  async login(type: LoginType.GOOGLE, payload: ILoginPayloadMap[LoginType.GOOGLE]): Promise<IUserEntity> {
    const {code} = payload
    if(!code) {
      throw new Error('Code is required')
    }
    let user = null
    try {
      const response = await axios.post('https://oauth2.googleapis.com/token', {
        client_id: process.env.GOOGLE_APP_ID,
        client_secret: process.env.GOOGLE_SECRET_KEY,
        redirect_uri: process.env.GOOGLE_REDIRECT_URL,
        code,
        grant_type: 'authorization_code',
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
      const {access_token, id_token} = response.data
      const userResponse = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
        headers: {
          Authorization: `Bearer ${id_token}`,
        }
      })
      const mail = userResponse.data.email
      user = await this.userRepository.findUserByMailAndLoginType(mail, type)
      if(!user) {
        user = await this.userRepository.createUser({
          mail,
          password: null,
          isAdmin: false,
          loginType: LoginType.GOOGLE,
        })
      }
    } catch (e) {
      console.error(e)
      throw new Error('Invalid code')
    }
    return user
  }
}