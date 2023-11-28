import {DiscordMessageType} from "../enum/DiscordMessageType";
import {IDiscordMessagePayloadMap} from "./IDiscordMessagePayloadMap.js";

export interface IDiscordService {
  sendMessage<T extends DiscordMessageType>(type: T, payload: IDiscordMessagePayloadMap[T], isAlert?: boolean ): Promise<any>
  createInteraction(): Promise<void>
}