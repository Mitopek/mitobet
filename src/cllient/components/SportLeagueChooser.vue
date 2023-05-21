<template>
  <div class="sport-discipline-chooser">
    <div class="items-container">
      <div v-for="league in props.sportLeagues" class="item-wrapper">
        {{league}}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SportDisciplineItem from "./SportDisciplineItem.vue";
import {SportDisciplines} from "../../server/services/OddsService/enum/SportDisciplines.js";
import {SportDisciplineType} from "../../server/services/OddsService/enum/SportDisciplineType.js";
import {$computed, $ref, $} from "vue/macros";

interface Props {
  sportLeagues: string[]
}

interface Emits {
  (e: 'choose', chosenType: SportDisciplineType): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()


</script>

<style scoped lang="scss">

.sport-discipline-chooser{
  height: 100%;
}

.item-wrapper{
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color .3s ease;
  &:hover {
   background-color: hsla(0, 0%, 14%, 0.5);
 }
}

.items-container{
  padding: 12px;
  display: flex;
  flex-flow: column;
  gap: 4px;
  height: 100%;
}




</style>