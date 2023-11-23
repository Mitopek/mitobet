<template>
  <div class="prices-content">
    <h1>Subskrypcja</h1>

    Nabywając subskrypcję, zyskujesz pełen dostęp do naszych najnowszych typów dotyczących bieżących wydarzeń sportowych. Nasze przewidywania są podzielone na kategorie, oparte na kursach zdarzeń oferowanych przez najpopularniejszych bukmacherów:
    <br/>
    <ul>
      <li><b>Na podwojenie</b>: To propozycje kuponów z kursem ok 2.0 - 3.0.</li>

      <li><b>Średni kurs</b>: Obejmuje typy o łącznym kursie do 15.0, pozwalając na różnorodność zakładów o umiarkowanej stawce.</li>

      <li><b>Większy kurs</b>: Typy o kursie większym niż 15.0, oferując możliwość uzyskania większych wygranych przy wyższym ryzyku.</li>
    </ul>
    <div class="subscriptions-container">
        <SubcriptionItemFactory
            v-for="subscription in subscriptionItems"
            :key="subscription.title"
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
h1{
  text-align: center;
  margin-bottom: 20px;
}

.prices-content{
  margin-top: 20px;
  text-align: left;
}

.text{
  text-align: justify;
}

.subscriptions-container{
  padding-top: 20px;
  gap: 20px;
  display: flex;
  align-items: center;
  align-content: baseline;
  justify-content: center;
  line-height: 150%;
  word-spacing: 0;
}

@media (max-width: 1050px) {
  .subscriptions-container{
    flex-direction: column;
    padding: 40px 0;
  }
}
</style>