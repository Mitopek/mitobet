import {ICreateVerificationProperties} from "../../../models/VerificationModel/types/ICreateVerificationProporties.js";
import {IVerificationEntity} from "../../../models/VerificationModel/types/IVerificationEntity.js";

export interface IVerificationRepository {
  createVerification(verification: ICreateVerificationProperties): Promise<IVerificationEntity>
  findVerificationBySecret(secret: IVerificationEntity['secret']): Promise<IVerificationEntity>
  findVerificationById(id: IVerificationEntity['id']): Promise<IVerificationEntity>
  updateVerificationById(id: IVerificationEntity['id'], verification: Partial<IVerificationEntity>): Promise<void>
}