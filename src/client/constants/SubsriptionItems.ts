import {SubscriptionComponentType} from "../enum/SubscriptionComponentType.js";

export const subscriptionItems = [
  {
    title: '1 miesiąc',
    pricePerMonth: 89.99,
    price: 89.99,
    descriptions: ['Płatność za jeden miesiąc.'],
    defaultType: SubscriptionComponentType.Normal
  },
  {
    title: '12 miesięcy',
    pricePerMonth: 69.99,
    price: 839.88,
    descriptions: ['Płatność jeden raz za wszystkie 12 miesięcy.', 'Dodatkowe 2 miesiące gratis (razem 14 miesięcy).'],
    bonus: '+ 2 MIESIĄCE GRATIS',
    defaultType: SubscriptionComponentType.Extra
  },
  {
    title: '6 miesięcy',
    pricePerMonth: 79.99,
    price: 479.94,
    descriptions: ['Płatność jeden raz za wszystkie 6 miesięcy.'],
    defaultType: SubscriptionComponentType.Normal
  },
]