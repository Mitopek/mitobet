import {inject, injectable} from "inversify";
import {Model} from "mongoose";
import {InterfaceTypes} from "../../types/InterfaceTypes.js";
import {ICouponRepository} from "./types/ICouponRepository.js";
import {ICreateCouponProperties} from "../../models/CouponModel/types/ICreateCouponProperties.js";
import {ICouponEntity} from "../../models/CouponModel/types/ICouponEntity.js";

@injectable()
export class CouponRepository implements ICouponRepository{
  constructor(
    @inject(InterfaceTypes.models.CouponModal) private couponModel: Model<ICouponEntity>
  ) {
  }

  async createCoupon(coupon: ICreateCouponProperties): Promise<ICouponEntity> {
    return this.couponModel.create(coupon)
  }

  async deleteCouponById(couponId: ICouponEntity['id']): Promise<void> {
    await this.couponModel.deleteOne({
      _id: couponId,
    })
  }

  async findFutureCoupons(): Promise<ICouponEntity[]> {
    const currentDate = new Date();
    return this.couponModel.find({
      startDate: {
        $gt: currentDate
      }
    });
  }
}