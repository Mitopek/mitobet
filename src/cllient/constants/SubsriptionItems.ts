import {SubscriptionComponentType} from "../enum/SubscriptionComponentType.js";

export const subscriptionItems = [
  {
    title: '1 miesiąc',
    pricePerMonth: 159.99,
    price: 159.99,
    descriptions: ['Płatność za jeden miesiąc.'],
    defaultType: SubscriptionComponentType.Normal
  },
  {
    title: '12 miesięcy',
    pricePerMonth: 99.99,
    price: 1199.99,
    descriptions: ['Płatność jeden raz za wszystkie 12 miesięcy.', 'Dodatkowe 2 miesiące gratis.'],
    bonus: '+ 2 MIESIĄCE GRATIS',
    defaultType: SubscriptionComponentType.Extra
  },
  {
    title: '6 miesięcy',
    pricePerMonth: 129.99,
    price: 779.99,
    descriptions: ['Płatność jeden raz za wszystkie 6 miesięcy.'],
    defaultType: SubscriptionComponentType.Normal
  },
]