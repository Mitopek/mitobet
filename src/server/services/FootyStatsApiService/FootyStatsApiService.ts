import {IFootyStatsApiService} from "./types/IFootyStatsApiService.js";
import axios from "axios";
import {format} from 'date-fns'
import {IFootyStatsMatch} from "./types/IFootyStatsMatch.js";
import {IFootyStatsMatchWithDetails} from "./types/IFootyStatsMatchWithDetails.js";
import {injectable} from "inversify";
import {IFootyStatsLeague} from "./types/IFootyStatsLeague.js";

@injectable()
export class FootyStatsApiService implements IFootyStatsApiService {
  apiUrl = 'https://api.football-data-api.com'
  apiKey = process.env.FOOTY_STATS_API

  async getLeagueList(): Promise<IFootyStatsLeague[]> {
    const response = await axios.get(`${this.apiUrl}/league-list`, {
      params: {
        chosen_leagues_only: true,
        key: this.apiKey,
      }
    })
    return response.data?.data
  }

  async getLeagueMatchesBySeasonId(seasonId: number): Promise<IFootyStatsMatch[]> {
    const response = await axios.get(`${this.apiUrl}/league-matches`, {
      params: {
        season_id: seasonId,
        key: this.apiKey,
      }
    })
    return response.data?.data
  }

  async getMatchesByDate(date: Date): Promise<IFootyStatsMatch[]> {
    const response = await axios.get(`${this.apiUrl}/todays-matches`, {
      params: {
        key: this.apiKey,
        date: format(date, 'yyyy-MM-dd')
      }
    })
    return response.data?.data
  }

  async getMatchWithDetails(matchId: number): Promise<IFootyStatsMatchWithDetails> {
    const response = await axios.get(`${this.apiUrl}/match`, {
      params: {
        key: this.apiKey,
        match_id: matchId,
      }
    })
    return response.data?.data
  }
}