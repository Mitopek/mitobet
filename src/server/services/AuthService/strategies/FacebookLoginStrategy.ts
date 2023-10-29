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
export class FacebookLoginStrategy implements ILoginStrategy {
  constructor(
    @inject(InterfaceTypes.repositories.UserRepository) private userRepository: IUserRepository,
    @inject(InterfaceTypes.services.AuthService) private authService: IAuthService,
  ) {}

  async login(type: LoginType.FACEBOOK, payload: ILoginPayloadMap[LoginType.FACEBOOK]): Promise<IUserEntity> {
    const {code} = payload
    if(!code) {
      throw new Error('Code is required')
    }
    let user = null
    try {
      const response = await axios.post('https://graph.facebook.com/v14.0/oauth/access_token', {
        client_id: process.env.FACEBOOK_APP_ID,
        client_secret: process.env.FACEBOOK_SECRET,
        redirect_uri: 'http://localhost:5173/',
        code,
      })
      const {access_token} = response.data
      const userResponse = await axios.get('https://graph.facebook.com/me', {
        params: {
          fields: 'id,email', // TODO PICTURES
          access_token,
        }
      })
      const mail = userResponse.data.email
      user = await this.userRepository.findUserByMail(mail)
      if(!user) {
        user = await this.userRepository.createUser({
          mail,
          password: null,
          isAdmin: false,
        })
      }
    } catch (e) {
      console.error(e)
      throw new Error('Invalid code')
    }
    return user
  }
}