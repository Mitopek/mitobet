import {IVerificationController} from "./types/IVerificationController.js";
import {IApiRequest} from "../../types/IApiRequest.js";
import {IApiResponse} from "../../types/IApiResponse.js";
import {Response} from "express";
import {inject, injectable} from "inversify";
import {InterfaceTypes} from "../../types/InterfaceTypes.js";
import {IVerificationRepository} from "../../repositories/VerificationRepository/types/IVerificationRepository.js";

@injectable()
export class VerificationController implements IVerificationController {
  constructor(
    @inject(InterfaceTypes.repositories.VerificationRepository) private verificationRepository: IVerificationRepository,
  ) {
  }

  async fulfillVerification(req: IApiRequest, res: IApiResponse): Promise<Response> {
    const {secret} = req.body
    const verification = await this.verificationRepository.findVerificationBySecret(secret)
    if(!verification || verification.fulfilledAt) {
      return res.sendFailResponse(['Konto zostało juz zweryfikowane.'], 401)
    }
    await this.verificationRepository.updateVerificationById(verification.id, {
      fulfilledAt: new Date(),
    })
    return res.sendSuccessResponse(null)
  }
}