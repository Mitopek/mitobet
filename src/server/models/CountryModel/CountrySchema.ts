import {Schema} from 'mongoose'
import {ICountryEntity} from "./types/ICountryEntity.js";

export const CountrySchema = new Schema<ICountryEntity>({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  code: {
    type: Schema.Types.String,
    required: false,
  },
  flag: {
    type: Schema.Types.String,
    required: false,
  },
})