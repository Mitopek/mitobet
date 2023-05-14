export const InterfaceTypes = {
  middlewares: {
    ApiResponseMiddleware: Symbol.for('ApiResponseMiddleware'),
    JWTAuthMiddleware: Symbol.for('JWTAuthMiddleware'),
  },
  repositories: {
    UserRepository: Symbol.for('UserRepository'),
  },
  controllers: {
    AuthController: Symbol.for('AuthController'),
    CouponController: Symbol.for('CouponController'),
  },
  models: {
    UserModel: Symbol.for('UserModel'),
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