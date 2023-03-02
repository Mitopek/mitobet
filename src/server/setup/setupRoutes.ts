import {AuthController} from "../controllers/AuthController/AuthController.js";
import {InterfaceTypes} from "../types/InterfaceTypes.js";
import {IAuthController} from "../controllers/AuthController/types/IAuthController.js";
import {Container} from "inversify";
import {Express} from "express";

export default function setupRoutes(app: Express, container: Container) {
  const authController = container.get<IAuthController>(InterfaceTypes.controllers.AuthController)
  app.post('/register', authController.register.bind(authController))
  app.post('/login', authController.login.bind(authController))
}
