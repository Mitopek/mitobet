import {Schema} from 'mongoose'
import {ILeagueEntity} from "./types/ILeagueEntity.js";

export const LeagueSchema = new Schema<ILeagueEntity>({
  league: {
    type: Schema.Types.Mixed,
    required: true,
  },
  country: {
    type: Schema.Types.Mixed,
    required: true,
  },
})