import {IUserEntity} from "../../../models/UserModel/types/IUserEntity.js";
import {ICreateUserProperties} from "../../../models/UserModel/types/ICreateUserProperties.js";
import {ICouponEntity} from "../../../models/CouponModel/types/ICouponEntity.js";
import {ICreateCouponProperties} from "../../../models/CouponModel/types/ICreateCouponProperties.js";

export interface ICouponRepository {
  createCoupon(coupon: ICreateCouponProperties): Promise<ICouponEntity>
  findFutureCoupons(): Promise<ICouponEntity[]>
  deleteCouponById(couponId: ICouponEntity['id']): Promise<void>
}