import {ILeagueEntity} from "../../../models/LeagueModel/types/ILeagueEntity.js";

export interface ILeagueRepository {
  findLeagues(): Promise<ILeagueEntity[]>
}