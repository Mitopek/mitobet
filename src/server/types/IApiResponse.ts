import {Response} from "express";

export interface IApiResponse extends Response {
  sendFailResponse(errors: unknown, code: number): Response
  sendSuccessResponse<ResponseType = unknown>(payload: ResponseType, code?: number): Response
}