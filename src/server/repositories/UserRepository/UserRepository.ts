import {inject, injectable} from "inversify";
import {IUserEntity} from "../../models/UserModel/types/IUserEntity.js";
import {Model} from "mongoose";
import {InterfaceTypes} from "../../types/InterfaceTypes.js";
import {IUserRepository} from "./types/IUserRepository.js";
import {ICreateUserProperties} from "../../models/UserModel/types/ICreateUserProperties.js";
import {LoginType} from "../../services/AuthService/enum/LoginType";

@injectable()
export class UserRepository implements IUserRepository{
  constructor(
    @inject(InterfaceTypes.models.UserModel) private userModel: Model<IUserEntity>
  ) {
  }

  async createUser(user: ICreateUserProperties): Promise<IUserEntity> {
    return this.userModel.create(user)
  }

  async findUserByMail(mail: IUserEntity['mail']): Promise<IUserEntity> {
    return this.userModel.findOne({
      mail
    })
  }

  async findUserByMailAndLoginType(mail: IUserEntity['mail'], loginType: LoginType): Promise<IUserEntity> {
    return this.userModel.findOne({
      mail,
      loginType,
    })
  }


  async findUserById(id: IUserEntity['id']): Promise<IUserEntity> {
    return this.userModel.findOne({
      _id: id,
    })
  }

  async findUsersByDateRange(from: Date, to: Date): Promise<IUserEntity[]> {
    return this.userModel.find({
      createdAt: {
        $gte: from,
        $lte: to,
      },
    })
  }

  async updateUserById(id: IUserEntity['id'], user: Partial<IUserEntity>): Promise<void> {
    await this.userModel.updateOne({
      _id: id,
    }, {
      $set: user,
    })
  }
}