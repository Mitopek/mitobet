import {IEntity} from "../../types/IEntity.js";

export interface IMatchEntity extends IEntity{
  homeId: number,
  awayId: number,
  seasonId: number,
  season: string;
  status: string;
  externalId: number,
  leagueName: string,
  leagueImage: string,
  countryName: string,
  date_unix: number,
  home_image: string,
  away_image: string,
  home_name: string,
  away_name: string,
  countryFlag?: string,
}