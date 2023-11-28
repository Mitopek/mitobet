import {CronJob} from "cron"
import {Container} from "inversify";
import {
  ISyncFootyStatsToDatabaseService
} from "../services/SyncFootyStatsToDatabaseService/types/ISyncFootyStatsToDatabaseService.js";
import {InterfaceTypes} from "../types/InterfaceTypes.js";
import {IDiscordService} from "../services/DiscordService/types/IDiscordService.js";
import {DiscordMessageType} from "../services/DiscordService/enum/DiscordMessageType.js";

export default async function executeOnStartupTasks(container: Container) {
  const syncFootyStatsToDatabaseService = container.get<ISyncFootyStatsToDatabaseService>(InterfaceTypes.services.SyncFootyStatsToDatabaseService)
  const discordService = container.get<IDiscordService>(InterfaceTypes.services.DiscordService)
  await discordService.createInteraction()
  if(process.env.NODE_ENV !== 'development') {
    new CronJob(
    '0 6,12,18,0 * * *',
      async function() {
        await discordService.sendMessage(DiscordMessageType.DAY_SUMMARY, null)
      },
      null,
      null,
      'Europe/Warsaw'
    )
    new CronJob(
      '*/10 * * * *',
      async function() {
        await discordService.sendMessage(DiscordMessageType.COUPONS_ERROR, null, true)
      },
      null,
      null,
      'Europe/Warsaw'
    )
  }
  // new CronJob(
  //   '*/3 * * * *',
  //   async function() {
  //     await discordService.sendMessage(DiscordMessageType.DAY_SUMMARY, null)
  //   },
  //   null,
  //   null,
  //   'Europe/Warsaw'
  // )

}








  // new CronJob(
  //   '0 2,14 * * *',
  //   async function() {
  //     await syncFutureMatches(syncFootyStatsToDatabaseService)
  //   },
  //   null,
  //   null,
  //   'Europe/Warsaw'
  // )
//   await syncFutureMatches(syncFootyStatsToDatabaseService)
//
// }
//
// async function syncFutureMatches(syncFootyStatsToDatabaseService: ISyncFootyStatsToDatabaseService) {
  // const date = new Date();
  // for (let i = 0; i < 7; i++) {
  //   await syncFootyStatsToDatabaseService.syncMatchesOfTheDay(date);
  //   date.setDate(date.getDate() + 1);
  // }