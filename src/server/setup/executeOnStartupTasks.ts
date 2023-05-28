import {CronJob} from "cron"
import {Container} from "inversify";
import {
  ISyncFootyStatsToDatabaseService
} from "../services/SyncFootyStatsToDatabaseService/types/ISyncFootyStatsToDatabaseService.js";
import {InterfaceTypes} from "../types/InterfaceTypes.js";

export default async function executeOnStartupTasks(container: Container) {
  // new CronJob(
  //   '0 2 * * *',
  //
  // )
  // const syncFootyStatsToDatabaseService = container.get<ISyncFootyStatsToDatabaseService>(InterfaceTypes.services.SyncFootyStatsToDatabaseService)
  // await syncFootyStatsToDatabaseService.syncMatchesOfTheDay(new Date())

}