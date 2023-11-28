export interface IDiscordMessageStrategy {
  getContent(): Promise<any>
}