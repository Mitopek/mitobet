<template>
  <div class="prices-content">
    <h2>Obstawiaj z nami</h2>
    <div class="text">
      Znowu postawiłeś kupon z kursem 1.2, ale przeciwnicy, których kurs wynosił 5.0, wygrali mecz? Dlaczego wśród graczy tak popularne jest powiedzenie "Nie graj po kursach"? Odpowiedź jest prosta: fakt, że określony jest niski kurs dla danego zdarzenia, nie gwarantuje pewnej wygranej. Dokładna analiza całego "kontekstu" danego wydarzenia, a w szczególnosci przez profesjonalistów, zwiększa bardzo mocno szanse na ogranie bukmachera i zgarnięcia wygranej. Nasz zespół oferuje naszym klientom właśnie to - przewidywania na poszczególne zdarzenia, poprzedzone dogłębną analizą.
    </div>
  </div>
</template>

<script setup lang="ts">
import VipPriceComponent from "./SubscriptionComponent.vue";
import {$ref} from "vue/macros";
import {SubscriptionComponentType} from "../enum/SubscriptionComponentType";
import SubcriptionItemFactory from "./factories/SubcriptionItemFactory.vue";

const subscriptionItems = $ref([{
    title: '1 miesiąc',
    pricePerMonth: 119.99,
    descriptions: ['Płatność każdego miesiąca.'],
    type: SubscriptionComponentType.Normal
  },
  {
    title: '12 miesięcy',
    pricePerMonth: 79.99,
    descriptions: ['Płatność jeden raz za wszystkie 12 miesięcy.', 'Dodatkowe 3 miesiące gratis.'],
    type: SubscriptionComponentType.Extra
  },
  {
    title: '6 miesięcy',
    pricePerMonth: 99.99,
    descriptions: ['Płatność jeden raz za wszystkie 6 miesięcy.'],
    type: SubscriptionComponentType.Normal
  },
])
</script>

<style scoped>

.text{
  text-align: justify;
}

.prices-content {
  text-align: center;
}

.subscriptions-container{
  flex-flow: row wrap;
  display: flex;
  align-items: center;
  align-content: baseline;
  justify-content: center;
  gap: 5px;
}

.subscription-wrapper{
  padding: 10px;
}
</style>