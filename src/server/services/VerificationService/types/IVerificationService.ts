export interface IVerificationService {
  sendVerificationMail(userId: string): Promise<void>
  sendResetPasswordMail(userId: string): Promise<void>
}