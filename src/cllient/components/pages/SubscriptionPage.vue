<template>
  <div class="notifications-page">
    <h2>Dokup czas subskrypcji</h2>
    <div class="subscription-time-wrapper">
      Twoja subskrypcja: <SubscriptionTime expires-at="subscriptionExpiresAt"/>
    </div>
    <div class="subscriptions-container">
      <SubcriptionItemFactory
          v-for="(subscription, index) in items"
          :key="subscription.title"
          :title="subscription.title"
          :pricePerMonth="subscription.pricePerMonth"
          :descriptions="subscription.descriptions"
          :bonus="subscription?.bonus"
          :price="subscription.price"
          :type="SubscriptionComponentType.ShopItem"
          @click="onBuyClick(index)"
      />
    </div>
    Kupując subskrypcję, zgadzasz się na <a href="/regulamin">regulamin</a> oraz <a href="/polityka-prywatnosci">politykę prywatności</a> serwisu. Wszystkie płatności są obsługiwane przez HotPay. W przypadku problemów z płatnością, prosimy o kontakt z administracją.
  </div>
</template>

<script setup lang="ts">
import SubscriptionsContent from "../SubscriptionsContent.vue";
import SubcriptionItemFactory from "../factories/SubcriptionItemFactory.vue";
import {subscriptionItems} from "../../constants/SubsriptionItems.js";
import {SubscriptionComponentType} from "../../enum/SubscriptionComponentType.js";
import {$computed, $ref} from "vue/macros";
import {onMounted} from "vue";
import UniversalCookie from "universal-cookie";
import SubscriptionTime from "../SubscriptionTime.vue";

const items = $computed(() => {
  return [...subscriptionItems].sort((a, b) => {
    return a.pricePerMonth - b.pricePerMonth
  })
})

let subscriptionExpiresAt = $ref<Date>(null)

onMounted(() => {
  const cookies = new UniversalCookie()
  subscriptionExpiresAt = new Date(cookies.get('subscription_expires_at' || null))
})

const onBuyClick = (index: number) => {
  const item = items[index]
  // window.open(`https://hotpay.pl/panel/kup?title=${item.title}&price=${item.price}&mail=${userMail.value}&type=subscription`)
}

</script>

<style scoped lang="scss">
@use '../../variables.scss' as variables;

a{
  color: map-get(variables.$colors, primary);
  text-decoration: underline;
}

h2{
  text-align: left;
}

.subscriptions-container{
  flex-flow: row wrap;
  display: flex;
  align-content: baseline;
  padding: 20px 4px;
  gap: 20px;
}

.subscription-time-wrapper{
  display: flex;
  align-items: center;
  gap: 4px;
}

</style>