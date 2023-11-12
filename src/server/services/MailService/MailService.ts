import {IMailService} from "./types/IMailService.js";
import {injectable} from "inversify";
import nodemailer from 'nodemailer'

@injectable()
export class MailService implements IMailService {
  validateMail(mail: string): boolean {
    if(!mail) {
      return false
    }
    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return mailRegex.test(mail)
  }

  async sendMail(mail: string, subject: string, html: string): Promise<void> {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: !!process.env.SMTP_SECURE,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      })
      const options = {
        from: process.env.SMTP_FROM,
        to: mail,
        subject,
        html,
      }
      const res = await transporter.sendMail(options)
    } catch(e) {
      console.log(e)
    }
  }
}