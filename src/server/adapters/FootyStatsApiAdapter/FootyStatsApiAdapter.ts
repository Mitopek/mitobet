import {IFootyStatsApiAdapter} from "./types/IFootyStatsApiAdapter.js";
import {IFootyStatsMatch} from "../../services/FootyStatsApiService/types/IFootyStatsMatch.js";
import {IFootyStatsMatchWithDetails} from "../../services/FootyStatsApiService/types/IFootyStatsMatchWithDetails.js";
import {inject, injectable} from "inversify";
import {InterfaceTypes} from "../../types/InterfaceTypes.js";
import {IFootyStatsApiService} from "../../services/FootyStatsApiService/types/IFootyStatsApiService.js";

@injectable()
export class FootyStatsApiAdapter implements IFootyStatsApiAdapter {
  constructor(
    @inject(InterfaceTypes.services.FootyStatsApiService) private footyStatsApiService: IFootyStatsApiService,
  ) {
  }

  async getLeagueMatchesBySeasonId(seasonId: number): Promise<IFootyStatsMatch[]> {
    const matches = await this.footyStatsApiService.getLeagueMatchesBySeasonId(seasonId)
    return matches.map(match => this.replaceNegativeOneWithNull(match))
  }

  async getMatchesByDate(date: Date): Promise<IFootyStatsMatch[]> {
    const matches = await this.footyStatsApiService.getMatchesByDate(date)
    return matches.map(match => this.replaceNegativeOneWithNull(match))
  }

  async getMatchWithDetails(matchId: number): Promise<IFootyStatsMatchWithDetails> {
    const match = await this.footyStatsApiService.getMatchWithDetails(matchId)
    return this.replaceNegativeOneWithNull(match)
  }

  private replaceNegativeOneWithNull(object: any) {
    if (typeof object === 'object' && object !== null) {
      if (Array.isArray(object)) {
        for (let i = 0; i < object.length; i++) {
          object[i] = this.replaceNegativeOneWithNull(object[i]);
        }
      } else {
        for (let prop in object) {
          if (object.hasOwnProperty(prop)) {
            object[prop] = this.replaceNegativeOneWithNull(object[prop]);
          }
        }
      }
    } else if (object == -1) {
      object = null;
    }
    return object;
  }
}