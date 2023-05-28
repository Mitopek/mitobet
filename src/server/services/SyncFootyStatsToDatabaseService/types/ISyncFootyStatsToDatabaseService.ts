export interface ISyncFootyStatsToDatabaseService {
  syncMatchesOfTheDay(date: Date): Promise<void>
}