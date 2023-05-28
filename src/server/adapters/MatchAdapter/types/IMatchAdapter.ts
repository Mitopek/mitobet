import {IMappedMatch} from "./IMappedMatch.js";

export interface IMatchAdapter {
  findFutureMatches(date: Date, daysAhead?: number): Promise<IMappedMatch[]>
}