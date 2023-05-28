import {Schema} from 'mongoose'
import {IMatchEntity} from "./types/IMatchEntity.js";

export const MatchSchema = new Schema<IMatchEntity>({
}, {
  strict: false
})