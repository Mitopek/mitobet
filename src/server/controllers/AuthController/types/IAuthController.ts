import {Request, Response} from "express";
import {IApiRequest} from "../../../types/IApiRequest.js";
import {IApiResponse} from "../../../types/IApiResponse.js";

export interface IAuthController {
  register(req: IApiRequest, res: IApiResponse): Promise<Response>
  changePassword(req: IApiRequest, res: IApiResponse): Promise<Response>
  login(req: IApiRequest, res: IApiResponse): Promise<Response>
  logout(req: IApiRequest, res: IApiResponse): Promise<Response>
  forgotPassword(req: IApiRequest, res: IApiResponse): Promise<Response>
  resetPassword(req: IApiRequest, res: IApiResponse): Promise<Response>
  acceptConsents(req: IApiRequest, res: IApiResponse): Promise<Response>
  getMe(req: IApiRequest, res: IApiResponse): Promise<Response>
}