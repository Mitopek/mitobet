import {IMatchRepository} from "./types/IMatchRepository.js";
import {inject, injectable} from "inversify";
import {InterfaceTypes} from "../../types/InterfaceTypes.js";
import {Model} from "mongoose";
import {IMatchEntity} from "../../models/MatchModel/types/IMatchEntity.js";

@injectable()
export class MatchRepository implements IMatchRepository {
  constructor(
    @inject(InterfaceTypes.models.MatchModal) private matchModal: Model<IMatchEntity>
  ) {
  }

  async createMatch(match: Partial<IMatchEntity>): Promise<IMatchEntity> {
    return await this.matchModal.create(match)
  }

  async findFutureMatches(date: Date, daysAhead: number = 0): Promise<IMatchEntity[]> {
    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const endOfDays = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1 + daysAhead)
    return this.matchModal.find({
      date_unix: {
        $gte: Math.floor(startOfDay.getTime() / 1000),
        $lt: Math.floor(endOfDays.getTime() / 1000),
      }
    });
  }
}