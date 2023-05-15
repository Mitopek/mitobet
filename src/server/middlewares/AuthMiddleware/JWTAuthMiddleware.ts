import {IAuthMiddleware} from "./types/IAuthMiddleware.js";
import {IApiRequest} from "../../types/IApiRequest.js";
import {IApiResponse} from "../../types/IApiResponse.js";
import {NextFunction} from "express";
import jwt from "jsonwebtoken";
import {injectable} from "inversify";

@injectable()
export class JWTAuthMiddleware implements IAuthMiddleware {
  async authenticate(req: IApiRequest, res: IApiResponse, next: NextFunction): Promise<void> {
    const {access_token: accessToken} = req.cookies
    console.info(req.cookies)
    if(!accessToken) {
      res.sendFailResponse('Authenticated failed', 401)
      return
    }
    try {
      req.authenticationData = await jwt.verify(accessToken, process.env.JWT_KEY) as IApiRequest['authenticationData']
      next()
    } catch (e) {
      res.sendFailResponse('Authenticated failed', 401)
    }
  }
}