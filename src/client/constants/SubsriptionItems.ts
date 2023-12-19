import {SubscriptionComponentType} from "../enum/SubscriptionComponentType.js";

export const subscriptionItems = [
  {
    id: 1,
    title: '1 miesiąc',
    pricePerMonth: '89,00',
    price: '89,00',
    fullPrice: 89,
    descriptions: ['Płatność za jeden miesiąc.'],
    defaultType: SubscriptionComponentType.Normal
  },
  {
    id: 3,
    title: '12 miesięcy',
    pricePerMonth: '79,00',
    price: '948,00',
    fullPrice: 948,
    descriptions: ['Płatność jeden raz za wszystkie 12 miesięcy.', 'Dodatkowe 2 miesiące gratis (razem 14 miesięcy).'],
    bonus: '+ 2 MIESIĄCE GRATIS',
    defaultType: SubscriptionComponentType.Extra
  },
  {
    id: 2,
    title: '6 miesięcy',
    pricePerMonth: '84,00',
    price: '504,00',
    fullPrice: 504,
    descriptions: ['Płatność jeden raz za wszystkie 6 miesięcy.'],
    defaultType: SubscriptionComponentType.Normal
  },
]