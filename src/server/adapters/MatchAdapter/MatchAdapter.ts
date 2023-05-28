import {IMatchAdapter} from "./types/IMatchAdapter.js";
import {inject, injectable} from "inversify";
import {InterfaceTypes} from "../../types/InterfaceTypes.js";
import {IMatchRepository} from "../../repositories/MatchRepository/types/IMatchRepository.js";
import {IMappedMatch} from "./types/IMappedMatch.js";

@injectable()
export class MatchAdapter implements IMatchAdapter {
  constructor(
    @inject(InterfaceTypes.repositories.MatchRepository) private matchRepository: IMatchRepository,
  ) {}

  async findFutureMatches(date: Date, daysAhead: number = 0): Promise<IMappedMatch[]> {
    const matches = await this.matchRepository.findFutureMatches(date, daysAhead)
    return matches.map(match => {
      const {externalId, leagueName, leagueImage, countryName, date_unix, home_image, away_image, home_name, away_name} = match
      return {
        externalId,
        leagueName,
        leagueImage,
        countryName,
        date_unix,
        home_image,
        away_image,
        home_name,
        away_name,
      }
    })
  }
}