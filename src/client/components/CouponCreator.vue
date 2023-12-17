<template>
  <div class="coupon-creator">
    <h2>Dodaj kupon</h2>
    <div v-if="!isPreviewing" class="form">
      Czas rozpoczęcia:
      <InputComponent value="startDate" @change="onDateChange" type="datetime-local"/>
      Adres url zdjęcia:
      <InputComponent v-model="imageUrl"/>
      Ryzyko:
      <RiskComponent :value="risk" :is-editable="true" @change="risk = $event"/>
      Opis (opcjonalne):
      <TextareaComponent v-model="description"/>
    </div>
    <div v-else>
      <CouponComponent :imageUrl="imageUrl" :startDate="startDate" :description="description" :canDelete="false" :risk="risk"/>
    </div>
    <div class="buttons-container">
      <ButtonComponent @click="isPreviewing=true" v-if="!isPreviewing">Przejdź do podglądu</ButtonComponent>
      <ButtonComponent @click="isPreviewing=false" v-else>Wróć do edycji</ButtonComponent>
      <ButtonComponent @click="onSave" v-if="isPreviewing">Dodaj kupon</ButtonComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputComponent from "./basic/InputComponent.vue";
import {$ref, $} from "vue/macros";
import CouponComponent from "./CouponComponent.vue";
import ButtonComponent from "./basic/ButtonComponent.vue";
import {useCoupons} from "../composables/useCoupons.js";
import TextareaComponent from "./basic/TextareaComponent.vue";
import RiskComponent from "./RiskComponent.vue";
import {format} from "date-fns";

interface Emits {
  (e: 'created'): void
}
const emit = defineEmits<Emits>()


const {createCoupon} = $(useCoupons())

let startDate = $ref(null)
let imageUrl = $ref('')
let description = $ref('')
let risk = $ref(1)

let isPreviewing = $ref(false)

const clearData = () => {
  isPreviewing = false
  startDate = null
  risk = 1
  imageUrl = ''
  description = ''
}

const onDateChange = (value: string) => {
  startDate = format(new Date(value), 'yyyy-MM-dd HH:mm')
}

const onSave = async () => {
  if(!imageUrl || !startDate) {
    return alert('Wypełnij wszystkie pola ziomek')
  }
  await createCoupon(imageUrl, new Date(startDate), risk, description)
  clearData()
  emit('created')
}

</script>

<style scoped>
.coupon-creator{
  box-sizing: border-box;
  max-width: 490px;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form{
  display: flex;
  flex-flow: column;
  gap: 4px;
}

.buttons-container{
  padding: 10px 0 0 0;
  display: flex;
  gap: 5px;
}

</style>