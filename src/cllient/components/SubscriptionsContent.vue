<template>
  <div class="prices-content">
    <h2>Subskrypcja</h2>
    <div class="text">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <div class="subscriptions-container">
      <div v-for="subscription in subscriptionItems" :key="subscription.title" class="subscription-wrapper">
        <SubcriptionItemFactory
            :title="subscription.title"
            :pricePerMonth="subscription.pricePerMonth"
            :descriptions="subscription.descriptions"
            :type="subscription.defaultType"
            :bonus="subscription?.bonus"
            :price="subscription.price"
            @click="emit('click')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SubcriptionItemFactory from "./factories/SubcriptionItemFactory.vue";
import {subscriptionItems} from "../constants/SubsriptionItems.js";

interface Emits {
  (e: 'click'): void
}

const emit = defineEmits<Emits>()
</script>

<style scoped>
.prices-content{
  margin-top: 20px;
  text-align: left;
}

.text{
  text-align: justify;
}

.subscriptions-container{
  margin-top: 10px;
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