import {inject, injectable} from "inversify";
import {IUserEntity} from "../../models/UserModel/types/IUserEntity.js";
import {Model} from "mongoose";
import {InterfaceTypes} from "../../types/InterfaceTypes.js";
import {IUserRepository} from "./types/IUserRepository.js";

@injectable()
export class UserRepository implements IUserRepository{
  constructor(
    @inject(InterfaceTypes.models.UserModel) private userModel: Model<IUserEntity>
  ) {
  }

  async createUser(user: Partial<IUserEntity>): Promise<IUserEntity> {
    return this.userModel.create(user)
  }

  async findUserByMail(mail: IUserEntity['mail']): Promise<IUserEntity> {
    return this.userModel.findOne({
      mail
    })
  }
}