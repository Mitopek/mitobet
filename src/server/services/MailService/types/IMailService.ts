export interface IMailService {
  validateMail(mail: string): boolean
  sendMail(mail: string, subject: string, text: string): Promise<void>
}