import {AuthController} from "../controllers/AuthController/AuthController.js";
import {Container, interfaces} from "inversify";
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
import {MailService} from "../services/MailService/MailService.js";
import {IMailService} from "../services/MailService/types/IMailService.js";
import {ICouponRepository} from "../repositories/CouponRepository/types/ICouponRepository.js";
import {CouponRepository} from "../repositories/CouponRepository/CouponRepository.js";
import {IAIController} from "../controllers/AIController/types/IAIController.js";
import {AIController} from "../controllers/AIController/AIController.js";
import {SportController} from "../controllers/SportController/SportController.js";
import {ISportController} from "../controllers/SportController/types/ISportController.js";
import {CountryRepository} from "../repositories/CountryRepository/CountryRepository.js";
import {ICountryRepository} from "../repositories/CountryRepository/types/ICountryRepository.js";
import {CountryController} from "../controllers/CountryController/CountryController.js";
import {ICountryController} from "../controllers/CountryController/types/ICountryController.js";
import {LeagueRepository} from "../repositories/LeagueRepository/LeagueRepository.js";
import {ILeagueRepository} from "../repositories/LeagueRepository/types/ILeagueRepository.js";
import {FootyStatsApiService} from "../services/FootyStatsApiService/FootyStatsApiService.js";
import {IFootyStatsApiService} from "../services/FootyStatsApiService/types/IFootyStatsApiService.js";
import {FootyStatsApiAdapter} from "../adapters/FootyStatsApiAdapter/FootyStatsApiAdapter.js";
import {IFootyStatsApiAdapter} from "../adapters/FootyStatsApiAdapter/types/IFootyStatsApiAdapter.js";
import {MatchRepository} from "../repositories/MatchRepository/MatchRepository.js";
import {IMatchRepository} from "../repositories/MatchRepository/types/IMatchRepository.js";
import {
  ISyncFootyStatsToDatabaseService
} from "../services/SyncFootyStatsToDatabaseService/types/ISyncFootyStatsToDatabaseService.js";
import {
  SyncFootyStatsToDatabaseService
} from "../services/SyncFootyStatsToDatabaseService/SyncFootyStatsToDatabaseService.js";
import {MatchAdapter} from "../adapters/MatchAdapter/MatchAdapter.js";
import {IMatchAdapter} from "../adapters/MatchAdapter/types/IMatchAdapter.js";
import {FixtureController} from "../controllers/FixtureController/FixtureController.js";
import {IFixtureController} from "../controllers/FixtureController/types/IFixtureController.js";
import {ILoginStrategy} from "../services/AuthService/ILoginStrategy.js";
import {FacebookLoginStrategy} from "../services/AuthService/strategies/FacebookLoginStrategy.js";
import {LocalLoginStrategy} from "../services/AuthService/strategies/LocalLoginStrategy.js";
import {LoginType} from "../services/AuthService/enum/LoginType.js";
import {GoogleLoginStrategy} from "../services/AuthService/strategies/GoogleLoginStrategy.js";


export default async function setupContainer() {
  const container = new Container();

  //MIDDLEWARES
  container.bind<IAuthMiddleware>(InterfaceTypes.middlewares.JWTAuthMiddleware).to(JWTAuthMiddleware)
  container.bind<ApiResponseMiddleware>(InterfaceTypes.middlewares.ApiResponseMiddleware).to(ApiResponseMiddleware)

  //CONTROLLERS
  container.bind<IAuthController>(InterfaceTypes.controllers.AuthController).to(AuthController)
  container.bind<ICouponController>(InterfaceTypes.controllers.CouponController).to(CouponController)
  container.bind<IAIController>(InterfaceTypes.controllers.AIController).to(AIController)
  container.bind<ISportController>(InterfaceTypes.controllers.SportController).to(SportController)
  container.bind<ICountryController>(InterfaceTypes.controllers.CountryController).to(CountryController)
  container.bind<IFixtureController>(InterfaceTypes.controllers.FixtureController).to(FixtureController)

  //REPOSITORIES
  container.bind<IUserRepository>(InterfaceTypes.repositories.UserRepository).to(UserRepository)
  container.bind<ICouponRepository>(InterfaceTypes.repositories.CouponRepository).to(CouponRepository)
  container.bind<ICountryRepository>(InterfaceTypes.repositories.CountryRepository).to(CountryRepository)
  container.bind<ILeagueRepository>(InterfaceTypes.repositories.LeagueRepository).to(LeagueRepository)
  container.bind<IMatchRepository>(InterfaceTypes.repositories.MatchRepository).to(MatchRepository)

  //SERVICES
  container.bind<IAuthService>(InterfaceTypes.services.AuthService).to(AuthService)
  container.bind<IPasswordService>(InterfaceTypes.services.PasswordService).to(PasswordService)
  container.bind<IMailService>(InterfaceTypes.services.MailService).to(MailService)
  container.bind<IFootyStatsApiService>(InterfaceTypes.services.FootyStatsApiService).to(FootyStatsApiService)
  container.bind<ISyncFootyStatsToDatabaseService>(InterfaceTypes.services.SyncFootyStatsToDatabaseService).to(SyncFootyStatsToDatabaseService)

  //ADAPTERS
  container.bind<IFootyStatsApiAdapter>(InterfaceTypes.adapters.FootyStatsApiAdapter).to(FootyStatsApiAdapter)
  container.bind<IMatchAdapter>(InterfaceTypes.adapters.MatchAdapter).to(MatchAdapter)

  //STRATEGIES
  container.bind<ILoginStrategy>(InterfaceTypes.strategies.ILoginStrategy).to(LocalLoginStrategy).whenTargetNamed(LoginType.LOCAL)
  container.bind<ILoginStrategy>(InterfaceTypes.strategies.ILoginStrategy).to(FacebookLoginStrategy).whenTargetNamed(LoginType.FACEBOOK)
  container.bind<ILoginStrategy>(InterfaceTypes.strategies.ILoginStrategy).to(GoogleLoginStrategy).whenTargetNamed(LoginType.GOOGLE)

  //FACTORIES
  container.bind<interfaces.Factory<ILoginStrategy>>(InterfaceTypes.factories.ILoginStrategyFactory).toFactory<ILoginStrategy>((context) => {
    return (type: LoginType) => {
      if(context.container.isBoundNamed(InterfaceTypes.strategies.ILoginStrategy, type)) {
        return context.container.getNamed<ILoginStrategy>(InterfaceTypes.strategies.ILoginStrategy, type)
      }
      return null
    }
  })

  //MONGOOSE
  await setupMongoose(container)

  return container
}

