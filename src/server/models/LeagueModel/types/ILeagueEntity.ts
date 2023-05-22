import {IEntity} from "../../types/IEntity.js";

export interface ILeagueEntity extends IEntity{
  country: {
    name: string,
    code: string,
    flag: string,
  }
  league: {
    id: number,
    name: string,
    type: string,
    logo: string,
  }
}