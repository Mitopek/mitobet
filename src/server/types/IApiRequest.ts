import {Request} from "express";

export interface IApiRequest extends Request {
  authenticationData: {
    userId: string,
  }
}