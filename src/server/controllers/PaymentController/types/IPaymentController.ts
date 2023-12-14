import {IApiRequest} from "../../../types/IApiRequest.js";
import {IApiResponse} from "../../../types/IApiResponse.js";
import {Response} from "express";

export interface IPaymentController{
  createPayment(req: IApiRequest, res: IApiResponse): Promise<Response>
  handlePayment(req: IApiRequest, res: IApiResponse): Promise<Response>
}