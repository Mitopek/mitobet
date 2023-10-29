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
import {IAIController} from "../controllers/AIController/types/IAIController.js";
import {ISportController} from "../controllers/SportController/types/ISportController.js";
import {ICountryController} from "../controllers/CountryController/types/ICountryController.js";
import {IFixtureController} from "../controllers/FixtureController/types/IFixtureController.js";

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

  //TODO: me route !!
  const authController = container.get<IAuthController>(InterfaceTypes.controllers.AuthController)
  app.use('/change-password', jwtAuthMiddleware.authenticate.bind(jwtAuthMiddleware))
  app.post('/register', authController.register.bind(authController))
  app.post('/change-password', authController.changePassword.bind(authController))
  app.post('/login', authController.login.bind(authController))
  app.post('/facebook-login', authController.login.bind(authController))
  app.post('/logout', authController.logout.bind(authController))

  const couponController = container.get<ICouponController>(InterfaceTypes.controllers.CouponController)
  app.use('/coupons', jwtAuthMiddleware.authenticate.bind(jwtAuthMiddleware))
  app.use('/coupon', jwtAuthMiddleware.authenticate.bind(jwtAuthMiddleware))
  app.get('/coupons', couponController.getCoupons.bind(couponController))
  app.post('/coupon', couponController.createCoupon.bind(couponController))
  app.delete('/coupon/:couponId', couponController.deleteCoupon.bind(couponController))

  const aiController = container.get<IAIController>(InterfaceTypes.controllers.AIController)
  app.use('/ai', jwtAuthMiddleware.authenticate.bind(jwtAuthMiddleware))
  app.post('/ai', aiController.sendMessage.bind(aiController))

  const countryController = container.get<ICountryController>(InterfaceTypes.controllers.CountryController)
  // app.use('/countries', jwtAuthMiddleware.authenticate.bind(jwtAuthMiddleware))
  app.get('/countries', countryController.getCountries.bind(countryController))

  const fixtureController = container.get<IFixtureController>(InterfaceTypes.controllers.FixtureController)
  // app.use('/fixtures', jwtAuthMiddleware.authenticate.bind(jwtAuthMiddleware))
  app.get('/fixtures', fixtureController.getFixtures.bind(fixtureController))

  const sportController = container.get<ISportController>(InterfaceTypes.controllers.SportController)
  app.get('/sports', sportController.getSportDisciplines.bind(sportController))
}
