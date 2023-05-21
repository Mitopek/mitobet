import {ISportController} from "./types/ISportController.js";
import {IApiRequest} from "../../types/IApiRequest.js";
import {IApiResponse} from "../../types/IApiResponse.js";
import {Response} from "express";
import {sports} from "../../services/OddsService/enum/Sports.js";
import {injectable} from "inversify";

@injectable()
export class SportController implements ISportController {
  async getSportDisciplines(req: IApiRequest, res: IApiResponse): Promise<Response> {
    const mappedSports: {
      group: string,
      titles: string[]
    }[] = [];
    sports.forEach(sport => {
      const existingGroup = mappedSports.find(mappedSport => mappedSport.group === sport.group)
      if (existingGroup) {
        existingGroup.titles.push(sport.title);
      } else {
        mappedSports.push({
          group: sport.group,
          titles: [sport.title]
        });
      }
    });
    console.log(mappedSports);
    return res.sendSuccessResponse({
      sports: mappedSports,
    })
  }
}