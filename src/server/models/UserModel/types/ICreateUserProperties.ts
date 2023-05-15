export interface ICreateUserProperties{
  mail: string,
  password: string,
  isAdmin: boolean
  subscriptionExpiresAt?: Date
}