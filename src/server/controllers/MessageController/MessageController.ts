import {IMessageController} from "./types/IMessageController.js";
import {IApiRequest} from "../../types/IApiRequest.js";
import {IApiResponse} from "../../types/IApiResponse.js";
import {Response} from "express";
import {inject, injectable} from "inversify";
import {InterfaceTypes} from "../../types/InterfaceTypes.js";
import {IDiscordService} from "../../services/DiscordService/types/IDiscordService.js";

@injectable()
export class MessageController implements IMessageController{
  constructor(
    @inject(InterfaceTypes.services.DiscordService) private discordService: IDiscordService,
  ) {
  }

  async sendQuestion(req: IApiRequest, res: IApiResponse): Promise<Response>{
    const { mail, question} = req.body
    this.discordService.createQuestionInteraction(mail, question)
    return res.sendSuccessResponse(null)
  }
}