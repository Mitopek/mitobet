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


  //TODO CATCH ERRORS
  async syncMatchesOfTheDay(date: Date): Promise<void> {
    const leagues = await this.footyStatsApiService.getLeagueList()
    const dayMatches = await this.footyStatsApiAdapter.getMatchesByDate(date)
    for(const league of leagues) {
      console.info(`League ${league.name} started`)
      const maxYearSeason = league.season.reduce((prev, current) => {
        return (prev.year > current.year) ? prev : current;
      })
      const seasonId = maxYearSeason?.id
      if(!seasonId) {
        console.error('No season found')
        continue
      }
      const seasonMatches = await this.footyStatsApiService.getLeagueMatchesBySeasonId(seasonId)
      const seasonDayMatches = dayMatches.filter(match => seasonMatches.some(seasonMatch => seasonMatch.id === match.id))
      if(!seasonMatches?.length) {
        console.info(`No matches for league ${league.name}, season: ${maxYearSeason.year}`)
        continue
      }
      await this.delay(this.timeout);
      for(const match of seasonDayMatches) {
        const mappedMatch = {
          externalId: match.id,
          homeId: match.homeID,
          awayId: match.awayID,
          season: match.season,
          status: match.status,
          date_unix: match.date_unix,
          home_name: match.home_name,
          away_name: match.away_name,
          home_image: match.home_image,
          away_image: match.away_image,
          leagueName: league.name,
          leagueImage: league.image,
          countryName: league.country,
          seasonId,
        }
        const matchInDatabase = await this.matchRepository.findMatchByExternalId(match.id)
        if(matchInDatabase) {
          await this.matchRepository.updateMatchByExternalId(match.id, mappedMatch)
          console.info(`Match with externalId ${mappedMatch.externalId} updated`)
        } else {
          await this.matchRepository.createMatch(mappedMatch)
          console.info(`Match with externalId ${mappedMatch.externalId} created`)
        }
      }
    }
    console.info(`Synchronize matches of the day done.`)
  }


  // async syncMatchesOfTheDay(date: Date): Promise<void> {
  //   const leagues = await this.footyStatsApiService.getLeagueList()
  //   const dayMatches = await this.footyStatsApiAdapter.getMatchesByDate(date)
  //   for(const league of leagues) {
  //     console.info(`League ${league.name} started`)
  //     const maxYearSeason = league.season.reduce((prev, current) => {
  //       return (prev.year > current.year) ? prev : current;
  //     })
  //     const seasonId = maxYearSeason?.id
  //     if(!seasonId) {
  //       console.error('No season found')
  //       continue
  //     }
  //     const seasonMatches = await this.footyStatsApiService.getLeagueMatchesBySeasonId(seasonId)
  //     const seasonDayMatches = dayMatches.filter(match => seasonMatches.some(seasonMatch => seasonMatch.id === match.id))
  //     if(!seasonMatches?.length) {
  //       console.info(`No matches for league ${league.name}, season: ${maxYearSeason.year}`)
  //       continue
  //     }
  //     await this.delay(this.timeout);
  //     for(const match of seasonDayMatches) {
  //       const mappedMatch = {
  //         externalId: match.id,
  //         homeId: match.homeID,
  //         awayId: match.awayID,
  //         season: match.season,
  //         status: match.status,
  //         date_unix: match.date_unix,
  //         home_name: match.home_name,
  //         away_name: match.away_name,
  //         home_image: match.home_image,
  //         away_image: match.away_image,
  //         leagueName: league.name,
  //         leagueImage: league.image,
  //         countryName: league.country,
  //         seasonId,
  //       }
  //       const matchInDatabase = await this.matchRepository.findMatchByExternalId(match.id)
  //       if(matchInDatabase) {
  //         await this.matchRepository.updateMatchByExternalId(match.id, mappedMatch)
  //         console.info(`Match with externalId ${mappedMatch.externalId} updated`)
  //       } else {
  //         await this.matchRepository.createMatch(mappedMatch)
  //         console.info(`Match with externalId ${mappedMatch.externalId} created`)
  //       }
  //     }
  //   }
  //   console.info(`Synchronize matches of the day done.`)
  // }




  private async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}