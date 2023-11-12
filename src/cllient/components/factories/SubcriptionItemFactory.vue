<template>
  <Component
    :is="subscriptionComponent"
    :title="props.title"
    :pricePerMonth="props.pricePerMonth"
    :descriptions="props.descriptions"
    :bonus="props?.bonus"
    :price="props.price"
    @click="emit('click')"
  />
</template>

<script setup lang="ts">

import {SubscriptionComponentType} from "../../enum/SubscriptionComponentType";
import SubscriptionComponent from "../SubscriptionComponent.vue";
import SubscriptionExtraComponent from "../SubscriptionExtraComponent.vue";
import {$computed} from "vue/macros";
import SubscriptionShopItemComponent from "../SubscriptionShopItemComponent.vue";

interface IProps {
  title: string,
  pricePerMonth: number,
  descriptions: string[],
  price: number,
  bonus?: string,
  type: SubscriptionComponentType
}

interface Emits {
  (e: 'click'): void
}

const emit = defineEmits<Emits>()
const props = withDefaults(defineProps<IProps>(), {
  bonus: null
})


const strategyComponentMap = new Map([
    [SubscriptionComponentType.ShopItem, SubscriptionShopItemComponent],
    [SubscriptionComponentType.Normal, SubscriptionComponent],
    [SubscriptionComponentType.Extra, SubscriptionExtraComponent]
])

const subscriptionComponent = $computed(() => {
  return strategyComponentMap.get(props.type)
})

</script>

<style scoped>

</style>