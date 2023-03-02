<template>
  <Component
    :is="subscriptionComponent"
    :title="props.title"
    :pricePerMonth="props.pricePerMonth"
    :descriptions="props.descriptions"
  />
</template>

<script setup lang="ts">

import {SubscriptionComponentType} from "../../enum/SubscriptionComponentType";
import SubscriptionComponent from "../SubscriptionComponent.vue";
import SubscriptionExtraComponent from "../SubscriptionExtraComponent.vue";
import {$computed} from "vue/macros";

interface IProps {
  title: string,
  pricePerMonth: number,
  descriptions: string[],
  type: SubscriptionComponentType
}

const props = defineProps<IProps>()

const strategyComponentMap = new Map([
    [SubscriptionComponentType.Normal, SubscriptionComponent],
    [SubscriptionComponentType.Extra, SubscriptionExtraComponent]
])

const subscriptionComponent = $computed(() => {
  return strategyComponentMap.get(props.type)
})

</script>

<style scoped>

</style>