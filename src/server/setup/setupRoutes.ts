import {AuthController} from "../controllers/AuthController/AuthController.js";
import {InterfaceTypes} from "../types/InterfaceTypes.js";
import {IAuthController} from "../controllers/AuthController/types/IAuthController.js";
import {Container} from "inversify";
import {Express} from "express";
import {IResponseMiddleware} from "../middlewares/ResponseMiddleware/types/IResponseMiddleware.js";
import {IAuthMiddleware} from "../middlewares/AuthMiddleware/types/IAuthMiddleware.js";
import {ICouponController} from "../controllers/CouponController/types/ICouponController.js";
import cors from "cors";
import helmet from "helmet";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'

export default function setupRoutes(app: Express, container: Container) {
  //TODO DEV ONLY
  app.use(cookieParser())
  app.use(helmet());
  app.use(cors({
    origin: ['http://127.0.0.1:5173','http://localhost:5173'],
    credentials: true,
    // exposedHeaders: ['set-cookie'],
  }))
  app.use(bodyParser.json())
  // app.options('*', cors({
  //   origin: '*',
  //   credentials: true,
  // }))


  const apiResponseMiddleware = container.get<IResponseMiddleware>(InterfaceTypes.middlewares.ApiResponseMiddleware)
  const jwtAuthMiddleware = container.get<IAuthMiddleware>(InterfaceTypes.middlewares.JWTAuthMiddleware)
  app.use(apiResponseMiddleware.handler.bind(apiResponseMiddleware))

  const authController = container.get<IAuthController>(InterfaceTypes.controllers.AuthController)
  app.post('/register', authController.register.bind(authController))
  app.post('/login', authController.login.bind(authController))

  const couponController = container.get<ICouponController>(InterfaceTypes.controllers.CouponController)
  app.use('/coupons', jwtAuthMiddleware.authenticate.bind(jwtAuthMiddleware))
  app.get('/coupons', couponController.getCoupons.bind(couponController))
}
