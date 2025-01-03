import * as mongoose from "mongoose";
import {UserSchema} from "../models/UserModel/UserSchema.js";
import {Container, interfaces} from "inversify";
import {IUserEntity} from "../models/UserModel/types/IUserEntity.js";
import {Model} from "mongoose";
import {InterfaceTypes} from "../types/InterfaceTypes.js";
import {ICouponEntity} from "../models/CouponModel/types/ICouponEntity.js";
import {CouponSchema} from "../models/CouponModel/CouponSchema.js";
import {ICountryEntity} from "../models/CountryModel/types/ICountryEntity.js";
import {CountrySchema} from "../models/CountryModel/CountrySchema.js";
import {ILeagueEntity} from "../models/LeagueModel/types/ILeagueEntity.js";
import {LeagueSchema} from "../models/LeagueModel/LeagueSchema.js";
import {IMatchEntity} from "../models/MatchModel/types/IMatchEntity.js";
import {MatchSchema} from "../models/MatchModel/MatchSchema.js";
import {VerificationSchema} from "../models/VerificationModel/VerificationSchema.js";
import {IVerificationEntity} from "../models/VerificationModel/types/IVerificationEntity.js";
import {PaymentSchema} from "../models/PaymentModel/PaymentSchema.js";
import {IPaymentEntity} from "../models/PaymentModel/types/IPaymentEntity.js";

export default async function setupMongoose(container: Container) {
  const mongooseClient = await mongoose.connect(process.env.MONGO_URL);
  container.bind<typeof mongoose>(InterfaceTypes.databases.Mongoose).toConstantValue(mongooseClient)

  container.bind<Model<IUserEntity>>(InterfaceTypes.models.UserModel).toDynamicValue((context: interfaces.Context) => {
    const mongooseClient = context.container.get<typeof mongoose>(InterfaceTypes.databases.Mongoose)
    return mongooseClient.model('User', UserSchema)
  })
  container.bind<Model<ICouponEntity>>(InterfaceTypes.models.CouponModal).toDynamicValue((context: interfaces.Context) => {
    const mongooseClient = context.container.get<typeof mongoose>(InterfaceTypes.databases.Mongoose)
    return mongooseClient.model('Coupon', CouponSchema)
  })
  container.bind<Model<ICountryEntity>>(InterfaceTypes.models.CountryModel).toDynamicValue((context: interfaces.Context) => {
    const mongooseClient = context.container.get<typeof mongoose>(InterfaceTypes.databases.Mongoose)
    return mongooseClient.model('Country', CountrySchema)
  })
  container.bind<Model<ILeagueEntity>>(InterfaceTypes.models.LeagueModel).toDynamicValue((context: interfaces.Context) => {
    const mongooseClient = context.container.get<typeof mongoose>(InterfaceTypes.databases.Mongoose)
    return mongooseClient.model('League', LeagueSchema)
  })
  container.bind<Model<IMatchEntity>>(InterfaceTypes.models.MatchModal).toDynamicValue((context: interfaces.Context) => {
    const mongooseClient = context.container.get<typeof mongoose>(InterfaceTypes.databases.Mongoose)
    return mongooseClient.model('Match', MatchSchema)
  })
  container.bind<Model<IVerificationEntity>>(InterfaceTypes.models.VerificationModel).toDynamicValue((context: interfaces.Context) => {
    const mongooseClient = context.container.get<typeof mongoose>(InterfaceTypes.databases.Mongoose)
    return mongooseClient.model('Verification', VerificationSchema)
  })
  container.bind<Model<IPaymentEntity>>(InterfaceTypes.models.PaymentModel).toDynamicValue((context: interfaces.Context) => {
    const mongooseClient = context.container.get<typeof mongoose>(InterfaceTypes.databases.Mongoose)
    return mongooseClient.model('Payment', PaymentSchema)
  })
}