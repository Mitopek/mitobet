import {ICountryEntity} from "../../../models/CountryModel/types/ICountryEntity.js";
import {IMappedMatch} from "../../../adapters/MatchAdapter/types/IMappedMatch.js";

export interface IGetFixturesRequest {
  response: {
    fixtures: {
      country: ICountryEntity,
      leagues: {
        name: string,
        image: string,
        matches: IMappedMatch[]
      }[]
    }[]
  }
}