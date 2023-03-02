import {AuthController} from "../controllers/AuthController/AuthController.js";
import {Container} from "inversify";
import {InterfaceTypes} from "../types/InterfaceTypes.js";
import {IAuthController} from "../controllers/AuthController/types/IAuthController.js";
import {UserRepository} from "../repositories/UserRepository/UserRepository.js";
import {IUserRepository} from "../repositories/UserRepository/types/IUserRepository.js";
import setupMongoose from "./setupMongoose.js";
import {IPasswordService} from "../services/PasswordService/types/IPasswordService.js";
import {PasswordService} from "../services/PasswordService/PasswordService.js";


export default async function setupContainer() {
  const container = new Container();
  //CONTROLLERS
  container.bind<IAuthController>(InterfaceTypes.controllers.AuthController).to(AuthController)

  //REPOSITORIES
  container.bind<IUserRepository>(InterfaceTypes.repositories.UserRepository).to(UserRepository)

  //SERVICES
  container.bind<IPasswordService>(InterfaceTypes.services.PasswordService).to(PasswordService)

  //MONGOOSE
  await setupMongoose(container)


  return container
}

