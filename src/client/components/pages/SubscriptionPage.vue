<template>
  <div class="subscription-page">
    <h3>Dokup czas subskrypcji</h3>
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
          @click="onBuyClick(subscription.id)"
      />
      Wszystkie płatności są obsługiwane przez platformę HotPay, która oferuje formy płatności takie jak: Przelewy ekspresowe, Blik, Karty płatnicze, Paysafecard, Paysafecash, Direct Carrier Billing, SMS Premium.
    </div>
    <form action="https://platnosc.hotpay.pl/" method="post">
      <input type="hidden" hidden name="SEKRET" :value="secret"/>
      <input type="hidden" hidden name="KWOTA" :value="amount"/>
      <input type="hidden" hidden name="NAZWA_USLUGI" :value="serviceName"/>
      <input type="hidden" hidden name="ID_ZAMOWIENIA" :value="orderId"/>
      <input type="hidden" hidden name="HASH" :value="hash"/>
      <button type="submit" hidden ref="submitRef"/>
    </form>
  </div>
</template>

<script setup lang="ts">
import SubcriptionItemFactory from "../factories/SubcriptionItemFactory.vue";
import {subscriptionItems} from "../../constants/SubsriptionItems.js";
import {SubscriptionComponentType} from "../../enum/SubscriptionComponentType.js";
import {$computed, $ref} from "vue/macros";
import {onMounted} from "vue";
import UniversalCookie from "universal-cookie";
import SubscriptionTime from "../SubscriptionTime.vue";
import {$} from "vue/macros";
import {usePayments} from "../../composables/usePayments.js";

const {createPayment} = $(usePayments())

const items = $computed(() => {
  return [...subscriptionItems].sort((a, b) => {
    return a.pricePerMonth > b.pricePerMonth ? 1 : -1
  })
})

const submitRef = $ref<HTMLButtonElement>(null)
const secret = $ref<string>('bHdCMlUwajdtRXRSeFF5cWxJeEIvZzRzMWhuUTdHMnFiVnhUL3V2VmhpTT0,')
const amount = $ref<number>(1)
const serviceName = $ref<string>('Subskrypcja')
let orderId = $ref<string>(null)
let hash = $ref<string>(null)

let subscriptionExpiresAt = $ref<Date>(null)

onMounted(() => {
  const cookies = new UniversalCookie()
  subscriptionExpiresAt = new Date(cookies.get('subscription_expires_at' || null))
})

const onBuyClick = async (id: number) => {
  const {payload} = await createPayment(id)
  orderId = payload.id
  hash = payload.hash
  submitRef.click()
}

</script>

<style scoped lang="scss">
@use '../../variables.scss' as variables;

a{
  color: map-get(variables.$colors, primary);
  text-decoration: underline;
}

h3{
  text-align: left;
}

.subscriptions-container{
  flex-flow: row wrap;
  display: flex;
  align-content: baseline;
  padding: 20px 4px;
  gap: 20px;
  width: 100%;
}

.subscription-time-wrapper{
  display: flex;
  align-items: center;
  gap: 4px;
}

.subscription-page{
  width: 100%;
}

@media (max-width: 700px) {
  .subscriptions-container{
    justify-content: center;
  }
}

</style>