import * as mongoose from "mongoose";
import {UserSchema} from "../models/UserModel/UserSchema.js";
import {Container, inject, injectable, interfaces} from "inversify";
import {IUserEntity} from "../models/UserModel/types/IUserEntity.js";
import {Model} from "mongoose";
import {InterfaceTypes} from "../types/InterfaceTypes.js";
import {ICouponEntity} from "../models/CouponModel/types/ICouponEntity.js";
import {CouponSchema} from "../models/CouponModel/CouponSchema.js";
import {ICountryEntity} from "../models/CountryModel/types/ICountryEntity.js";
import {CountrySchema} from "../models/CountryModel/CountrySchema.js";
import {ILeagueEntity} from "../models/LeagueModel/types/ILeagueEntity.js";
import {LeagueSchema} from "../models/LeagueModel/LeagueSchema.js";

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
}