import {AuthController} from "../controllers/AuthController/AuthController.js";
import {Container} from "inversify";
import {InterfaceTypes} from "../types/InterfaceTypes.js";
import {IAuthController} from "../controllers/AuthController/types/IAuthController.js";
import {UserRepository} from "../repositories/UserRepository/UserRepository.js";
import {IUserRepository} from "../repositories/UserRepository/types/IUserRepository.js";
import setupMongoose from "./setupMongoose.js";
import {IPasswordService} from "../services/PasswordService/types/IPasswordService.js";
import {PasswordService} from "../services/PasswordService/PasswordService.js";
import {IAuthService} from "../services/AuthService/types/IAuthService.js";
import {AuthService} from "../services/AuthService/AuthService.js";
import {ApiResponseMiddleware} from "../middlewares/ResponseMiddleware/ApiResponseMiddleware.js";
import {JWTAuthMiddleware} from "../middlewares/AuthMiddleware/JWTAuthMiddleware.js";
import {IAuthMiddleware} from "../middlewares/AuthMiddleware/types/IAuthMiddleware.js";
import {ICouponController} from "../controllers/CouponController/types/ICouponController.js";
import {CouponController} from "../controllers/CouponController/CouponController.js";


export default async function setupContainer() {
  const container = new Container();

  //MIDDLEWARES
  container.bind<IAuthMiddleware>(InterfaceTypes.middlewares.JWTAuthMiddleware).to(JWTAuthMiddleware)
  container.bind<ApiResponseMiddleware>(InterfaceTypes.middlewares.ApiResponseMiddleware).to(ApiResponseMiddleware)

  //CONTROLLERS
  container.bind<IAuthController>(InterfaceTypes.controllers.AuthController).to(AuthController)
  container.bind<ICouponController>(InterfaceTypes.controllers.CouponController).to(CouponController)

  //REPOSITORIES
  container.bind<IUserRepository>(InterfaceTypes.repositories.UserRepository).to(UserRepository)

  //SERVICES
  container.bind<IAuthService>(InterfaceTypes.services.AuthService).to(AuthService)
  container.bind<IPasswordService>(InterfaceTypes.services.PasswordService).to(PasswordService)

  //MONGOOSE
  await setupMongoose(container)


  return container
}

