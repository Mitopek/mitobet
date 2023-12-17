<template>
  <div class="coupon-component">
    <div>Start: <span class="start-date">{{props.startDate}}</span></div>
    <div class="risk-wrapper">Ryzyko: <RiskComponent :value="props.risk"/></div>
    <div class="image-wrapper">
      <img :src="props.imageUrl" alt="" class="img"/>
    </div>
    <div class="text-container">
      <span class="description" v-if="description">{{props.description}}</span>
    </div>
    <div class="buttons-container">
      <ButtonComponent @click="toggleDelete = false" v-if="toggleDelete">Anuluj</ButtonComponent>
      <ButtonComponent @click="emit('delete')" v-if="toggleDelete">Tak, usuń</ButtonComponent>
      <ButtonComponent @click="toggleDelete = true" v-else-if="props.canDelete">Usuń</ButtonComponent>
    </div>
  </div>
</template>

<script setup lang="ts">

import ButtonComponent from "./basic/ButtonComponent.vue";
import {$ref} from "vue/macros";
import RiskComponent from "./RiskComponent.vue";

interface Props {
  imageUrl: string
  startDate: string
  risk: number
  description?: string
  canDelete?: boolean
}

interface Emits {
  (e: 'delete'): void
}

const props = withDefaults(defineProps<Props>(), {
  description: '',
  canDelete: false,
})

const toggleDelete = $ref(false)

const emit = defineEmits<Emits>()

</script>

<style scoped lang="scss">
@use '../variables.scss' as variables;

.coupon-component{
  background: map-get(variables.$colors, surfaceMediumLow);
  border-radius: 10px;
  padding: 15px;
  display: flex;
  max-width: 100%;
  box-sizing: border-box;
  flex-flow: column;
  justify-content: center;
}

.image-wrapper{

}

.risk-wrapper{
  display: flex;
  align-items: center;
  gap: 5px;
  padding-bottom: 4px;
}

.start-date{
  font-weight: 600;
  letter-spacing: 1px;
}

.img{
  border: 1px solid black;
  max-width: 100%;
}

.description{
  font-size: 14px;
}

.buttons-container{
  display: flex;
  gap: 6px;
}

</style>