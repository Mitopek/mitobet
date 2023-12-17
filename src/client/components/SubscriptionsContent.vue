<template>
  <div class="prices-content">
    <h1>Subskrypcja</h1>

    Nabywając subskrypcję, zyskujesz pełen dostęp do naszych typów dotyczących bieżących wydarzeń sportowych. Nasze przewidywania są podzielone na kategorie, oparte na szacowanym ryzku niepowodzenia.
    <br/>
    <ul>
      <li><div class="category-list-item"><RiskComponent :value="1"/>  <div>Nasze najczęstsze typy. Kursy zazwyczaj ok 2.0 - 3.0.</div></div></li>

      <li><div class="category-list-item"><RiskComponent :value="2"/>  <div>Szukanie "perełek" do obstawiania, których łączny kurs nie przekracza 10.</div></div></li>

      <li><div class="category-list-item"><RiskComponent :value="3"/>  <div>Jest ryzyko, jest zabawa! 🙂 </div></div></li>
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
import RiskComponent from "./RiskComponent.vue";

interface Emits {
  (e: 'click'): void
}

const emit = defineEmits<Emits>()
</script>

<style scoped>
h1{
  text-align: left;
  margin: 20px 0 24px 0;
  font-family: 'Bree Serif', sans-serif;
  font-size: 3rem;
}

.prices-content{
  margin-top: 20px;
  text-align: left;
}

.category-list-item{
  display: flex;
  align-items: center;
  gap: 16px;
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