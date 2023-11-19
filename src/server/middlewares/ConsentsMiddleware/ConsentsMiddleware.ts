import {IConsentsMiddleware} from "./types/IConsentsMiddleware.js";
import {IApiRequest} from "../../types/IApiRequest.js";
import {IApiResponse} from "../../types/IApiResponse.js";
import {NextFunction} from "express";
import {injectable} from "inversify";

@injectable()
export class ConsentsMiddleware implements IConsentsMiddleware {
  checkConsents(req: IApiRequest, res: IApiResponse, next: NextFunction): void {
    const {hasAcceptedRegulations, hasAcceptedPrivatePolicy} = req.authenticationData;
    if (!hasAcceptedRegulations || !hasAcceptedPrivatePolicy) {
      res.sendFailResponse(['You must accept regulations and private policy'], 401);
      return;
    }
    next();
  }
}