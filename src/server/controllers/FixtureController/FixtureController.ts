import {IFixtureController} from "./types/IFixtureController.js";
import {IApiRequest} from "../../types/IApiRequest.js";
import {IApiResponse} from "../../types/IApiResponse.js";
import {Response} from "express";
import {inject, injectable} from "inversify";
import {InterfaceTypes} from "../../types/InterfaceTypes.js";
import {ILeagueRepository} from "../../repositories/LeagueRepository/types/ILeagueRepository.js";
import {ICountryRepository} from "../../repositories/CountryRepository/types/ICountryRepository.js";
import {IMatchRepository} from "../../repositories/MatchRepository/types/IMatchRepository.js";
import {IMatchAdapter} from "../../adapters/MatchAdapter/types/IMatchAdapter.js";
import {IGetCountriesRequest} from "../CountryController/types/IGetCountriesRequest.js";
import {IGetFixturesRequest} from "./types/IGetFixturesRequest.js";

@injectable()
export class FixtureController implements IFixtureController {
  constructor(
    @inject(InterfaceTypes.repositories.CountryRepository) private countryRepository: ICountryRepository,
    @inject(InterfaceTypes.adapters.MatchAdapter) private matchAdapter: IMatchAdapter,
  ) {}

  async getFixtures(req: IApiRequest, res: IApiResponse): Promise<Response> {
    //TODO WORD ETC
    const countries = await this.countryRepository.findCountries()
    const matches = await this.matchAdapter.findFutureMatches(new Date(), 7)
    const uniqueCountriesNames = [...new Set(matches.map(match => match.countryName))]
    const activeCountries = countries.filter(country => uniqueCountriesNames.includes(country.name))
    const fixtures = activeCountries.map(activeCountry => {
      const countryMatches = matches.filter(match => match.countryName === activeCountry.name)
      const leagues = [...new Set(countryMatches.map(match => match.leagueName))].map(leagueName => {
        const matches = countryMatches.filter(match => match.leagueName === leagueName).sort((matchA, matchB) => {
          return matchA.date_unix - matchB.date_unix
        }).map(match => {
          return {
            ...match,
            countryFlag: activeCountry.flag,
          }
        })
        const image = countryMatches.find(match => match.leagueName === leagueName).leagueImage
        return {
          name: leagueName,
          image,
          matches,
        }
      })
      return {
        country: activeCountry,
        leagues,
      }
    })
    return res.sendSuccessResponse<IGetFixturesRequest['response']>({
      fixtures,
    })
  }
}