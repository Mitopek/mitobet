import {IApiRequest} from "../../../types/IApiRequest.js";
import {IApiResponse} from "../../../types/IApiResponse.js";
import {Response} from "express";

export interface ISportController {
  getSportDisciplines(req: IApiRequest, res: IApiResponse): Promise<Response>
}