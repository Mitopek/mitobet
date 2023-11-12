export const InterfaceTypes = {
  middlewares: {
    ApiResponseMiddleware: Symbol.for('ApiResponseMiddleware'),
    JWTAuthMiddleware: Symbol.for('JWTAuthMiddleware'),
  },
  repositories: {
    UserRepository: Symbol.for('UserRepository'),
    CouponRepository: Symbol.for('CouponRepository'),
    CountryRepository: Symbol.for('CountryRepository'),
    LeagueRepository: Symbol.for('LeagueRepository'),
    MatchRepository: Symbol.for('MatchRepository'),
    VerificationRepository: Symbol.for('VerificationRepository'),
  },
  controllers: {
    AuthController: Symbol.for('AuthController'),
    CouponController: Symbol.for('CouponController'),
    AIController: Symbol.for('AIController'),
    SportController: Symbol.for('SportController'),
    CountryController: Symbol.for('CountryController'),
    VerificationController: Symbol.for('VerificationController'),
    LeagueController: Symbol.for('LeagueController'),
    FixtureController: Symbol.for('FixtureController'),
  },
  models: {
    UserModel: Symbol.for('UserModel'),
    CouponModal: Symbol.for('CouponModal'),
    CountryModel: Symbol.for('CountryModel'),
    LeagueModel: Symbol.for('LeagueModel'),
    MatchModal: Symbol.for('MatchModal'),
    VerificationModel: Symbol.for('VerificationModel'),
  },
  services: {
    AuthService: Symbol.for('AuthService'),
    PasswordService: Symbol.for('PasswordService'),
    MailService: Symbol.for('MailService'),
    FootyStatsApiService: Symbol.for('FootyStatsApiService'),
    SyncFootyStatsToDatabaseService: Symbol.for('SyncFootyStatsToDatabaseService'),
    VerificationService: Symbol.for('VerificationService'),
  },
  adapters: {
    FootyStatsApiAdapter: Symbol.for('FootyStatsApiAdapter'),
    MatchAdapter: Symbol.for('MatchAdapter'),
  },
  strategies: {
    ILoginStrategy: Symbol.for('ILoginStrategy'),
  },
  factories: {
    ILoginStrategyFactory: Symbol.for('ILoginStrategyFactory'),
  },
  databases: {
    Mongoose: Symbol.for('Mongoose'),
  }
};