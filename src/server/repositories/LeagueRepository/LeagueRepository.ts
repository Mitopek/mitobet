import {ILeagueRepository} from "./types/ILeagueRepository.js";
import {inject, injectable} from "inversify";
import {InterfaceTypes} from "../../types/InterfaceTypes.js";
import {Model} from "mongoose";
import {ILeagueEntity} from "../../models/LeagueModel/types/ILeagueEntity.js";

@injectable()
export class LeagueRepository implements ILeagueRepository {
  constructor(
    @inject(InterfaceTypes.models.LeagueModel) private leagueModel: Model<ILeagueEntity>
  ) {
  }

  async findLeagues(): Promise<ILeagueEntity[]> {
    return this.leagueModel.find()
  }
}