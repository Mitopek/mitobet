import {IResponseMiddleware} from "./types/IResponseMiddleware.js";
import {Response, Request, NextFunction} from "express";
import {injectable} from "inversify";
import {IApiRequest} from "../../types/IApiRequest.js";
import {IApiResponse} from "../../types/IApiResponse.js";

@injectable()
export class ApiResponseMiddleware implements IResponseMiddleware {

  handler(req: IApiRequest, res: IApiResponse, next: NextFunction): void {
    res.sendFailResponse = this.createSendFailResponse(res)
    res.sendSuccessResponse = this.createSendSuccessResponse(res)
    next()
  }

  private createSendFailResponse(res: Response) {
    return (errors: unknown, code: number): Response => {
      return res.status(code).send({
        success: false,
        errors,
      });
    };
  }

  private createSendSuccessResponse(res: Response) {
    return (payload: unknown, code: number = 200) => {
      return res.status(code).send(
        {
          success: true,
          payload,
        }
      );
    };
  }
}