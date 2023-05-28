import {IMatchEntity} from "../../../models/MatchModel/types/IMatchEntity.js";

export interface IMatchRepository {
  createMatch(match: Partial<IMatchEntity>): Promise<IMatchEntity>
  findFutureMatches(date: Date, daysAhead?: number): Promise<IMatchEntity[]>
}