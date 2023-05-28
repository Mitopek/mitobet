import {IFootyStatsMatch} from "./IFootyStatsMatch.js";
import {IFootyStatsMatchWithDetails} from "./IFootyStatsMatchWithDetails.js";
import {IFootyStatsLeague} from "./IFootyStatsLeague.js";

export interface IFootyStatsApiService {
  getLeagueList(): Promise<IFootyStatsLeague[]>
  getLeagueMatchesBySeasonId(seasonId: number): Promise<IFootyStatsMatch[]>
  getMatchesByDate(date: Date): Promise<IFootyStatsMatch[]>
  getMatchWithDetails(matchId: number): Promise<IFootyStatsMatchWithDetails>
}