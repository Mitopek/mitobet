import {IVerificationRepository} from "./types/IVerificationRepository.js";
import {IVerificationEntity} from "../../models/VerificationModel/types/IVerificationEntity.js";
import {ICreateVerificationProperties} from "../../models/VerificationModel/types/ICreateVerificationProporties.js";
import {inject, injectable} from "inversify";
import {InterfaceTypes} from "../../types/InterfaceTypes.js";
import {Model} from "mongoose";

@injectable()
export class VerificationRepository implements IVerificationRepository {
  constructor(
    @inject(InterfaceTypes.models.VerificationModel) private verificationModel: Model<IVerificationEntity>
  ) {}

  async createVerification(verification: ICreateVerificationProperties): Promise<IVerificationEntity> {
    return this.verificationModel.create(verification)
  }

  async findVerificationBySecret(secret: IVerificationEntity['secret']): Promise<IVerificationEntity> {
    return this.verificationModel.findOne({
      secret
    })
  }

  async findVerificationById(id: IVerificationEntity['id']): Promise<IVerificationEntity> {
    return this.verificationModel.findOne({
      _id: id,
    })
  }

  async updateVerificationById(id: IVerificationEntity['id'], verification: Partial<IVerificationEntity>): Promise<void> {
    await this.verificationModel.updateOne({
      _id: id,
    }, {
      $set: verification,
    })
  }
}