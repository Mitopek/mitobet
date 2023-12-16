import {SubscriptionComponentType} from "../enum/SubscriptionComponentType.js";

export const subscriptionItems = [
  {
    id: 1,
    title: '1 miesiąc',
    pricePerMonth: '40,00',
    price: '40,00',
    fullPrice: 40,
    descriptions: ['Płatność za jeden miesiąc.'],
    defaultType: SubscriptionComponentType.Normal
  },
  {
    id: 3,
    title: '12 miesięcy',
    pricePerMonth: '30,00',
    price: '360,00',
    fullPrice: 360,
    descriptions: ['Płatność jeden raz za wszystkie 12 miesięcy.', 'Dodatkowe 2 miesiące gratis (razem 14 miesięcy).'],
    bonus: '+ 2 MIESIĄCE GRATIS',
    defaultType: SubscriptionComponentType.Extra
  },
  {
    id: 2,
    title: '6 miesięcy',
    pricePerMonth: '35,00',
    price: '210,00',
    fullPrice: 210,
    descriptions: ['Płatność jeden raz za wszystkie 6 miesięcy.'],
    defaultType: SubscriptionComponentType.Normal
  },
]