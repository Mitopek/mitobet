<template>
  <div class="sport-event-chooser">
    <div class="title">Wybierz zdarzenie:</div>
    <div class="items-container">
      <InputComponent v-model="search" placeholder="Szukaj..."/>
    </div>
<!--    <div class="chosen-item-wrapper" v-if="chosenDisciplineItem">-->
<!--      <div>-->
<!--        <i :class="chosenDisciplineItem.iconClass"/>-->
<!--      </div>-->
<!--      <div>-->
<!--        {{chosenDisciplineItem.title}}-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script setup lang="ts">
import InputComponent from "./basic/InputComponent.vue";
import {$ref, $} from "vue/macros";
import {useSports} from "../composables/useSports.js";

interface Props {
  chosenMatch: unknown
}

const props = defineProps<Props>()
const {getSports} = $(useSports())

const search = $ref('')


</script>

<style scoped>

.item-wrapper{

}

.items-container{
  background-color: #0000009e;
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  min-height: 300px;
}


.chosen-item-wrapper{
  padding: 8px;
  justify-content: center;
  display: flex;
  gap: 4px;
}

.title{
  width: 100%;
  text-align: center;
  padding: 4px;
}


</style>