<template>
  <div class="coupon-component">
    <div>Rozpoczęcie: <span class="start-date">{{props.startDate}}</span></div>
    <div class="image-wrapper">
      <img :src="props.imageUrl" alt="" class="img"/>
    </div>
    <div class="text-container">
      <span class="description" v-if="description">{{props.description}}</span>
    </div>
    <div class="buttons-container">
      <ButtonComponent @click="toggleDelete = false" v-if="toggleDelete">Anuluj</ButtonComponent>
      <ButtonComponent @click="emit('delete')" v-if="toggleDelete">Tak, usuń</ButtonComponent>
      <ButtonComponent @click="toggleDelete = true" v-else>Usuń</ButtonComponent>
    </div>
  </div>
</template>

<script setup lang="ts">

import ButtonComponent from "./basic/ButtonComponent.vue";
import {$ref} from "vue/macros";

interface Props {
  imageUrl: string
  startDate: Date
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

<style scoped>

.coupon-component{
  display: flex;
  max-width: 460px;
  flex-flow: column;
  justify-content: center;
}

.image-wrapper{

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