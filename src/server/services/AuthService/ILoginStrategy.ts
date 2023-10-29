import {ILoginPayloadMap} from "./types/ILoginPayloadMap";
import {LoginType} from "./enum/LoginType.js";
import {IUserEntity} from "../../models/UserModel/types/IUserEntity";

export interface ILoginStrategy {
  login(type: LoginType, payload: ILoginPayloadMap[LoginType]): Promise<IUserEntity>
}