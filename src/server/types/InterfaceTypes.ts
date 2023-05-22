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
  },
  controllers: {
    AuthController: Symbol.for('AuthController'),
    CouponController: Symbol.for('CouponController'),
    AIController: Symbol.for('AIController'),
    SportController: Symbol.for('SportController'),
    CountryController: Symbol.for('CountryController'),
    LeagueController: Symbol.for('LeagueController'),
  },
  models: {
    UserModel: Symbol.for('UserModel'),
    CouponModal: Symbol.for('CouponModal'),
    CountryModel: Symbol.for('CountryModel'),
    LeagueModel: Symbol.for('LeagueModel')
  },
  services: {
    AuthService: Symbol.for('AuthService'),
    PasswordService: Symbol.for('PasswordService'),
    MailService: Symbol.for('MailService'),
  },
  databases: {
    Mongoose: Symbol.for('Mongoose'),
  }
};