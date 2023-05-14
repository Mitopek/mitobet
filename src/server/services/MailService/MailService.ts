import {IMailService} from "./types/IMailService.js";
import {injectable} from "inversify";

@injectable()
export class MailService implements IMailService {
  validateMail(mail: string): boolean {
    if(!mail) {
      return false
    }
    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return mailRegex.test(mail)
  }
}