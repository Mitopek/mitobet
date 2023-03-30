import {Response} from "express";
import {IApiRequest} from "../../../types/IApiRequest.js";
import {IApiResponse} from "../../../types/IApiResponse.js";

export interface ICouponController {
  getCoupons(req: IApiRequest, res: IApiResponse): Promise<Response>
}