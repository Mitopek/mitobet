<template>
  <div class="prices-content">
    <h2>Subskrypcja</h2>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    <div class="subscriptions-container">
      <div v-for="subscription in subscriptionItems" :key="subscription.title" class="subscription-wrapper">
        <SubcriptionItemFactory
            :title="subscription.title"
            :pricePerMonth="subscription.pricePerMonth"
            :descriptions="subscription.descriptions"
            :type="subscription.type"
        />
      </div>
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
.prices-content{
  color: #213547;
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