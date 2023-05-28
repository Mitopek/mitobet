import {ICountryController} from "./types/ICountryController.js";
import {IApiRequest} from "../../types/IApiRequest.js";
import {IApiResponse} from "../../types/IApiResponse.js";
import {Response} from "express";
import {inject, injectable} from "inversify";
import {InterfaceTypes} from "../../types/InterfaceTypes.js";
import {ILeagueRepository} from "../../repositories/LeagueRepository/types/ILeagueRepository.js";
import {IGetCountriesRequest} from "./types/IGetCountriesRequest.js";

@injectable()
export class CountryController implements ICountryController {
  constructor(
    @inject(InterfaceTypes.repositories.LeagueRepository) private leagueRepository: ILeagueRepository,
  ) {}

  async getCountries(req: IApiRequest, res: IApiResponse): Promise<Response> {
    const leagues = await this.leagueRepository.findLeagues()
    const uniqueCountries = Array.from(new Set(leagues.map(league => league.country.name))).map(name => {
      const country = leagues.find(league => league.country.name === name).country;
      return {
        countryName: country.name,
        countryFlag: country.flag,
      };
    });
    const countries = uniqueCountries.map(country => {
      return {
        ...country,
        leagues: leagues.filter(league => league.country.name === country.countryName).map(league => {
          return {
            ...league.league
          }
        })
      }
    })
    return res.sendSuccessResponse<IGetCountriesRequest['response']>({
      countries,
    })
  }
}