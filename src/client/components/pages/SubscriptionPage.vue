<template>
  <div class="subscription-page">
    <h3>Dokup czas subskrypcji</h3>
    <div class="subscription-time-wrapper">
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
    <form action="https://platnosc.hotpay.pl/" target="_blank" method="post">
      <input type="hidden" name="SEKRET" :value="secret"/>
      <input type="hidden" name="KWOTA" ref="priceRef"/>
      <input type="hidden" name="NAZWA_USLUGI" :value="serviceName"/>
      <input type="hidden" name="ID_ZAMOWIENIA" ref="orderIdRef"/>
      <input type="hidden" name="HASH" ref="hashRef"/>
      <button type="submit" ref="submitRef" hidden/>
    </form>
  </div>
</template>

<script setup lang="ts">
import SubcriptionItemFactory from "../factories/SubcriptionItemFactory.vue";
import {subscriptionItems} from "../../constants/SubsriptionItems.js";
import {SubscriptionComponentType} from "../../enum/SubscriptionComponentType.js";
import {$computed, $ref} from "vue/macros";
import {nextTick, onMounted} from "vue";
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
let orderIdRef = $ref(null)
let hashRef = $ref(null)
let priceRef = $ref(null)


const onBuyClick = async (id: number) => {
  const {payload} = await createPayment(id)
  priceRef.value = subscriptionItems.find(item => item.id === id)?.fullPrice
  orderIdRef.value = payload.id
  console.info('orderIdRef', hashRef.value)
  await nextTick(async () => {
    await setTimeout(() => {
      submitRef.click()
    }, 1000)
  })
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