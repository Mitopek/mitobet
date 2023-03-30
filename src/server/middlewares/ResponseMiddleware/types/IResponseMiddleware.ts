import {IApiRequest} from "../../../types/IApiRequest.js";
import {IApiResponse} from "../../../types/IApiResponse.js";
import {NextFunction} from "express";

export interface IResponseMiddleware {
  handler(req: IApiRequest, res: IApiResponse, next: NextFunction): void
}