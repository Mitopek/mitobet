import {ICountryEntity} from "../../../models/CountryModel/types/ICountryEntity.js";

export interface ICountryRepository {
  findCountries(): Promise<ICountryEntity[]>
}