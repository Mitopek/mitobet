import {IFootyStatsMatch} from "../../../services/FootyStatsApiService/types/IFootyStatsMatch.js";
import {IFootyStatsMatchWithDetails} from "../../../services/FootyStatsApiService/types/IFootyStatsMatchWithDetails.js";
import {IFootyStatsLeague} from "../../../services/FootyStatsApiService/types/IFootyStatsLeague.js";

export interface IFootyStatsApiAdapter {
  getLeagueMatchesBySeasonId(seasonId: number): Promise<IFootyStatsMatch[]>
  getMatchesByDate(date: Date): Promise<IFootyStatsMatch[]>
  getMatchWithDetails(matchId: number): Promise<IFootyStatsMatchWithDetails>
}