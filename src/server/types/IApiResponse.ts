import {Response} from "express";

export interface IApiResponse extends Response {
  sendFailResponse(errors: unknown, code: number): Response
  sendSuccessResponse(payload: unknown, code?: number): Response
}