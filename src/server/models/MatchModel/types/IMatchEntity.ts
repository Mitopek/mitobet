import {IEntity} from "../../types/IEntity.js";
import {IFootyStatsMatchWithDetails} from "../../../services/FootyStatsApiService/types/IFootyStatsMatchWithDetails.js";

export interface IMatchEntity extends IEntity, Omit<IFootyStatsMatchWithDetails, 'id'>{
  externalId: number,
  leagueName: string,
  leagueImage: string,
  countryName: string,
}