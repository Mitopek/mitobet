import {inject, injectable} from "inversify";
import {IDiscordMessageStrategy} from "../types/IDiscordMessageStrategy.js";
import {format} from "date-fns";
import {InterfaceTypes} from "../../../types/InterfaceTypes.js";
import {IUserRepository} from "../../../repositories/UserRepository/types/IUserRepository.js";
import {ICouponRepository} from "../../../repositories/CouponRepository/types/ICouponRepository.js";
import * as http from "http";
import axios from "axios";

@injectable()
export class DiscordCouponsAlertMessageStrategy implements IDiscordMessageStrategy {
  constructor(
    @inject(InterfaceTypes.repositories.UserRepository) private userRepository: IUserRepository,
    @inject(InterfaceTypes.repositories.CouponRepository) private couponRepository: ICouponRepository,
  ) {
  }

  public async getContent(): Promise<any> {
    const couponCount = await this.couponRepository.findFutureCoupons()
    const errorCouponIds: string[] = []
    for(const coupon of couponCount){
      console.info(coupon)
      const {imageUrl} = coupon
      await axios.get(imageUrl)
        .then(response => {
          console.info('response', response.status)
          if (response.status !== 200) {
            errorCouponIds.push(coupon.id);
          }
        })
        .catch(error => {
          console.info('error', error)
          errorCouponIds.push(coupon.id);
        });
    }
    if(!errorCouponIds.length){
      return null
    }
    return {
      content: `🆘 **Kupony**`,
      embeds: [
        {
          color: 0x3498db,
          title: 'Zdjęcia nie działają',
          fields: [
            {
              name: 'IDs',
              value: errorCouponIds.join(', '),
            },
          ]
        },
      ],
    }
  }
}