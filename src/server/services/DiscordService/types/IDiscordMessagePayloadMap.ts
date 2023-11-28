import {DiscordMessageType} from "../enum/DiscordMessageType";

export interface IDiscordMessagePayloadMap {
  [DiscordMessageType.DAY_SUMMARY]: null
  [DiscordMessageType.NEW_COUPON]: null
  [DiscordMessageType.COUPONS_ERROR]: null
  [DiscordMessageType.NEW_PAYMENT]: null
}