<template>
  <div class="sport-discipline-chooser">
    <div class="items-container">
      <div v-for="item in props.sportDisciplines" class="item-wrapper">
        <SportDisciplineItem :title="item.title" :iconClass="item.iconClass" @click="emit('choose', item.type)" :isChosen="props.chosenType === item.type"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SportDisciplineItem from "./SportDisciplineItem.vue";
import {SportDisciplineType} from "../../server/services/OddsService/enum/SportDisciplineType.js";

interface Props {
  chosenType: SportDisciplineType
  sportDisciplines: any
}

interface Emits {
  (e: 'choose', chosenType: SportDisciplineType): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// const chosenDisciplineItem = $computed(() => {
//   if(!props.chosenType) {
//     return null
//   }
//   return SportDisciplines.find(item => item.type === props.chosenType)
// })

</script>

<style scoped>

.sport-discipline-chooser{
  height: 100%;
}

.item-wrapper{

}

.items-container{
  padding: 12px;
  display: flex;
  flex-flow: column;
  text-align: center;
  gap: 16px;
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