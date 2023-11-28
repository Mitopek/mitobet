import {inject, injectable} from "inversify";
import {IDiscordMessageStrategy} from "../types/IDiscordMessageStrategy.js";
import {format} from "date-fns";
import {InterfaceTypes} from "../../../types/InterfaceTypes.js";
import {IUserRepository} from "../../../repositories/UserRepository/types/IUserRepository.js";
import {ICouponRepository} from "../../../repositories/CouponRepository/types/ICouponRepository.js";

@injectable()
export class DiscordDaySummaryMessageStrategy implements IDiscordMessageStrategy {
  constructor(
    @inject(InterfaceTypes.repositories.UserRepository) private userRepository: IUserRepository,
    @inject(InterfaceTypes.repositories.CouponRepository) private couponRepository: ICouponRepository,
  ) {
  }

  public async getContent(): Promise<any> {
    const startOfDay = new Date(new Date().setHours(0, 0, 0, 0))
    const endOfDay = new Date(new Date().setHours(23, 59, 59, 999))
    const usersCount = (await this.userRepository.findUsersByDateRange(startOfDay, endOfDay)).length
    const couponCount = (await this.couponRepository.findCouponsByDateRange(startOfDay, endOfDay)).length

    return {
      content: `📑 **Podsumowanie dnia - ${format(new Date(), 'HH:mm')}**`,
      embeds: [
        {
          color: 0x3498db,
          fields: [
            {
              name: 'Rejestracje',
              value: usersCount,
            },
            {
              name: 'Wrzucone kupony',
              value: couponCount,
            },
            {
              name: 'Platności',
              value: 0,
            },
          ],
        },
      ],
    }
  }
}