export interface IFootyStatsLeague {
  name: string,
  image: string,
  country: string,
  season: {
    id: number,
    year: number,
    country: string,
  }[]
}
