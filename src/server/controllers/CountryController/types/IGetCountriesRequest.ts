export interface IGetCountriesRequest {
  response: {
    countries: {
      countryName: string,
      countryFlag: string,
      leagues: {
        id: number,
        name: string,
        type: string,
        logo: string,
      }[]
    }[]
  }
}