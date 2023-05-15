export const InterfaceTypes = {
  middlewares: {
    ApiResponseMiddleware: Symbol.for('ApiResponseMiddleware'),
    JWTAuthMiddleware: Symbol.for('JWTAuthMiddleware'),
  },
  repositories: {
    UserRepository: Symbol.for('UserRepository'),
    CouponRepository: Symbol.for('CouponRepository')
  },
  controllers: {
    AuthController: Symbol.for('AuthController'),
    CouponController: Symbol.for('CouponController'),
  },
  models: {
    UserModel: Symbol.for('UserModel'),
    CouponModal: Symbol.for('CouponModal'),
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