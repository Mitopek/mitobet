// import {DiscordMessageType} from "./enum/DiscordMessageType";
// import {IDiscordService} from "./types/IDiscordService";
//
// export class DiscordService implements IDiscordService {
//
//   public async sendMessage(type: DiscordMessageType): Promise<void> {
//     const message = this.discordMessageFactory.createMessage(type)
//     const channel = this.discordClient.channels.cache.get(this.discordConfig.channelId)
//     if (channel.isText()) {
//       await channel.send(message)
//     }
//   }
// }