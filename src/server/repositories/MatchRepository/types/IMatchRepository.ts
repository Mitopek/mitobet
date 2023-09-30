import {IMatchEntity} from "../../../models/MatchModel/types/IMatchEntity.js";

export interface IMatchRepository {
  createMatch(match: Partial<IMatchEntity>): Promise<IMatchEntity>
  findMatchByExternalId(externalId: number): Promise<IMatchEntity>
  findFutureMatches(date: Date, daysAhead?: number): Promise<IMatchEntity[]>
  updateMatchByExternalId(externalId: number, match: Partial<IMatchEntity>): Promise<IMatchEntity>
}