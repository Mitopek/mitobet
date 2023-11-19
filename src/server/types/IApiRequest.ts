import {Request} from "express";

export interface IApiRequest extends Request {
  authenticationData: {
    userId: string,
    isAdmin: boolean
    hasAcceptedRegulations: boolean,
    hasAcceptedPrivatePolicy: boolean,
  }
}