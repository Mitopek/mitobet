import {ISyncFootyStatsToDatabaseService} from "./types/ISyncFootyStatsToDatabaseService.js";
import {inject, injectable} from "inversify";
import {InterfaceTypes} from "../../types/InterfaceTypes.js";
import {IFootyStatsApiAdapter} from "../../adapters/FootyStatsApiAdapter/types/IFootyStatsApiAdapter.js";
import {IFootyStatsApiService} from "../FootyStatsApiService/types/IFootyStatsApiService.js";
import {IMatchRepository} from "../../repositories/MatchRepository/types/IMatchRepository.js";

@injectable()
export class SyncFootyStatsToDatabaseService implements ISyncFootyStatsToDatabaseService {
  timeout = 2500

  constructor(
    @inject(InterfaceTypes.services.FootyStatsApiService) private footyStatsApiService: IFootyStatsApiService,
    @inject(InterfaceTypes.adapters.FootyStatsApiAdapter) private footyStatsApiAdapter: IFootyStatsApiAdapter,
    @inject(InterfaceTypes.repositories.MatchRepository) private matchRepository: IMatchRepository,
  ) {
  }

  async syncMatchesOfTheDay(date: Date): Promise<void> {
    const leagues = await this.footyStatsApiService.getLeagueList()
    const dayMatches = await this.footyStatsApiAdapter.getMatchesByDate(date)
    for(const league of leagues) {
      console.info(`League ${league.name} started`)
      const maxYearSeason = league.season.reduce((prev, current) => {
        return (prev.year > current.year) ? prev : current;
      })
      const seasonId = maxYearSeason?.id
      console.info(seasonId)
      if(!seasonId) {
        console.error('No season found')
        continue
      }
      const seasonMatches = await this.footyStatsApiService.getLeagueMatchesBySeasonId(seasonId)
      const seasonDayMatches = dayMatches.filter(match => seasonMatches.some(seasonMatch => seasonMatch.id === match.id))
      if(!seasonDayMatches?.length) {
        continue
      }
      for(const match of seasonDayMatches) {
        await this.delay(this.timeout);
        let matchWithDetails = await this.footyStatsApiAdapter.getMatchWithDetails(match.id)
        const matchWithAllDetails = {
          leagueName: league.name,
          leagueImage: league.image,
          countryName: league.country,
          externalId: matchWithDetails.id,
          seasonId,
          ...matchWithDetails,
          id: undefined as string,
        }
        await this.matchRepository.createMatch(matchWithAllDetails)
        console.info(`Match with id ${matchWithAllDetails.externalId} created`)
      }
    }
    console.info(`Synchronize matches of the day done.`)
  }

  private async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}