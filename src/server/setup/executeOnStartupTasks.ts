import {CronJob} from "cron"
import {Container} from "inversify";
import {
  ISyncFootyStatsToDatabaseService
} from "../services/SyncFootyStatsToDatabaseService/types/ISyncFootyStatsToDatabaseService.js";
import {InterfaceTypes} from "../types/InterfaceTypes.js";

export default async function executeOnStartupTasks(container: Container) {
  const syncFootyStatsToDatabaseService = container.get<ISyncFootyStatsToDatabaseService>(InterfaceTypes.services.SyncFootyStatsToDatabaseService)
  // new CronJob(
  //   '0 2,14 * * *',
  //   async function() {
  //     await syncFutureMatches(syncFootyStatsToDatabaseService)
  //   },
  //   null,
  //   null,
  //   'Europe/Warsaw'
  // )
  await syncFutureMatches(syncFootyStatsToDatabaseService)
}

async function syncFutureMatches(syncFootyStatsToDatabaseService: ISyncFootyStatsToDatabaseService) {
  // const date = new Date();
  // for (let i = 0; i < 7; i++) {
  //   await syncFootyStatsToDatabaseService.syncMatchesOfTheDay(date);
  //   date.setDate(date.getDate() + 1);
  // }

}