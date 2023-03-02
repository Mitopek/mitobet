export const InterfaceTypes = {
  repositories: {
    UserRepository: Symbol.for('UserRepository'),
  },
  controllers: {
    AuthController: Symbol.for('AuthController')
  },
  models: {
    UserModel: Symbol.for('UserModel')
  },
  services: {
    PasswordService: Symbol.for('PasswordService')
  },
  databases: {
    Mongoose: Symbol.for('Mongoose')
  }
};