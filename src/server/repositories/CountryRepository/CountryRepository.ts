import {ICountryRepository} from "./types/ICountryRepository.js";
import {ICountryEntity} from "../../models/CountryModel/types/ICountryEntity.js";
import {inject, injectable} from "inversify";
import {InterfaceTypes} from "../../types/InterfaceTypes.js";
import {Model} from "mongoose";
import {IUserEntity} from "../../models/UserModel/types/IUserEntity.js";

@injectable()
export class CountryRepository implements ICountryRepository {
  constructor(
    @inject(InterfaceTypes.models.CountryModel) private countryModel: Model<ICountryEntity>
  ) {
  }

  async findCountries(): Promise<ICountryEntity[]> {
    return this.countryModel.find()
  }
}