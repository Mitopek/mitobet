import {AuthController} from "../controllers/AuthController/AuthController.js";
import {InterfaceTypes} from "../types/InterfaceTypes.js";
import {IAuthController} from "../controllers/AuthController/types/IAuthController.js";
import {Container} from "inversify";
import {Express, Router} from "express";
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
import {IVerificationController} from "../controllers/VerificationController/types/IVerificationController.js";

export default function setupRoutes(apiRouter: Router, container: Container) {
  //TODO DEV ONLY
  apiRouter.use(cookieParser())
  apiRouter.use(helmet());
  apiRouter.use(cors({
    origin: [`${process.env.IP_CLIENT_HOST}/`,`${process.env.CLIENT_HOST}/`],
    credentials: true,
    // exposedHeaders: ['set-cookie'],
  }))
  apiRouter.use(bodyParser.json())
  // app.options('*', cors({
  //   origin: '*',
  //   credentials: true,
  // }))


  const apiResponseMiddleware = container.get<IResponseMiddleware>(InterfaceTypes.middlewares.ApiResponseMiddleware)
  const jwtAuthMiddleware = container.get<IAuthMiddleware>(InterfaceTypes.middlewares.JWTAuthMiddleware)
  apiRouter.use(apiResponseMiddleware.handler.bind(apiResponseMiddleware))

  //TODO: me route !!
  const authController = container.get<IAuthController>(InterfaceTypes.controllers.AuthController)
  apiRouter.use('/change-password', jwtAuthMiddleware.authenticate.bind(jwtAuthMiddleware))
  apiRouter.post('/register', authController.register.bind(authController))
  apiRouter.post('/change-password', authController.changePassword.bind(authController))
  apiRouter.post('/forgot-password', authController.forgotPassword.bind(authController))
  apiRouter.post('/reset-password', authController.resetPassword.bind(authController))
  apiRouter.post('/login', authController.login.bind(authController))
  apiRouter.post('/facebook-login', authController.login.bind(authController))
  apiRouter.post('/logout', authController.logout.bind(authController))

  const couponController = container.get<ICouponController>(InterfaceTypes.controllers.CouponController)
  apiRouter.use('/coupons', jwtAuthMiddleware.authenticate.bind(jwtAuthMiddleware))
  apiRouter.use('/coupon', jwtAuthMiddleware.authenticate.bind(jwtAuthMiddleware))
  apiRouter.get('/coupons', couponController.getCoupons.bind(couponController))
  apiRouter.post('/coupon', couponController.createCoupon.bind(couponController))
  apiRouter.delete('/coupon/:couponId', couponController.deleteCoupon.bind(couponController))

  const verificationController = container.get<IVerificationController>(InterfaceTypes.controllers.VerificationController)
  apiRouter.post('/verification/fulfill', verificationController.fulfillVerification.bind(verificationController))

  // const aiController = container.get<IAIController>(InterfaceTypes.controllers.AIController)
  // app.use('/ai', jwtAuthMiddleware.authenticate.bind(jwtAuthMiddleware))
  // app.post('/ai', aiController.sendMessage.bind(aiController))
  //
  // const countryController = container.get<ICountryController>(InterfaceTypes.controllers.CountryController)
  // // app.use('/countries', jwtAuthMiddleware.authenticate.bind(jwtAuthMiddleware))
  // app.get('/countries', countryController.getCountries.bind(countryController))
  //
  // const fixtureController = container.get<IFixtureController>(InterfaceTypes.controllers.FixtureController)
  // // app.use('/fixtures', jwtAuthMiddleware.authenticate.bind(jwtAuthMiddleware))
  // app.get('/fixtures', fixtureController.getFixtures.bind(fixtureController))
  //
  // const sportController = container.get<ISportController>(InterfaceTypes.controllers.SportController)
  // app.get('/sports', sportController.getSportDisciplines.bind(sportController))
}
