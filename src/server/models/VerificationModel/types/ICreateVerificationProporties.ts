export interface ICreateVerificationProperties{
  userId: string,
  secret: string,
  expiresAt: Date,
  fulfilledAt: Date,
}