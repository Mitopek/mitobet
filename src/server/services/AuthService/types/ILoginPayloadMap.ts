import {LoginType} from "../enum/LoginType.js";

export interface ILoginPayloadMap {
  [LoginType.FACEBOOK]: {
    code: string
  }
  [LoginType.GOOGLE]: {
    code: string
  }
  [LoginType.LOCAL]: {
    mail: string,
    password: string
  }
}