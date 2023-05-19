<template>
  <div class="coupon-creator">
    <h2>Dodaj kupon</h2>
    <div v-if="!isPreviewing" class="form">
      Czas rozpoczęcia:
      <InputComponent v-model="startDate" type="date"/>
      Adres url zdjęcia:
      <InputComponent v-model="imageUrl"/>
      Opis (opcjonalne):
      <TextareaComponent v-model="description"/>
    </div>
    <div v-else>
      <CouponComponent :imageUrl="imageUrl" :startDate="startDate" :description="description" :canDelete="false"/>
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

interface Emits {
  (e: 'created'): void
}
const emit = defineEmits<Emits>()


const {createCoupon} = $(useCoupons())

let startDate = $ref(new Date())
let imageUrl = $ref('')
let description = $ref('')

let isPreviewing = $ref(false)

const clearData = () => {
  isPreviewing = false
  startDate = new Date()
  imageUrl = ''
  description = ''
}

const onSave = async () => {
  if(!imageUrl || !startDate) {
    return
  }
  await createCoupon(imageUrl, startDate, description)
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