<template>
  <div class="sport-event-chooser">
    <div class="items-container">
      <div class="row-wrapper" v-for="(match, index) in props.matches" :key="match.externalId">
        <div class="date-separator" v-if="isNewDayMatch(index)">
          {{getMatchDate(match)}}
        </div>
        <div class="match-item-wrapper">
          <MatchItem :match="match"/>
        </div>
      </div>
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
import {IMappedMatch} from "../../server/adapters/MatchAdapter/types/IMappedMatch.js";
import MatchItem from "./MatchItem.vue";
import {format} from "date-fns";

interface Props {
  matches: IMappedMatch[]
}

const props = defineProps<Props>()

const search = $ref('')

const isNewDayMatch = (index: number) => {
  if(index === 0) {
    return true
  }
  const previousMatchDay = new Date(props.matches[index - 1].date_unix * 1000).getDate()
  const currentMatchDay = new Date(props.matches[index].date_unix * 1000).getDate()
  return previousMatchDay !== currentMatchDay;
}

const getMatchDate = (match: IMappedMatch) => {
  const todayDate = new Date()
  const tomorrowDate = new Date()
  tomorrowDate.setDate(todayDate.getDate() + 1)
  const matchDate = new Date(match.date_unix * 1000)
  if(matchDate.getMonth() === todayDate.getMonth() && matchDate.getDate() === todayDate.getDate()) {
    return `Dzisiaj, ${format(matchDate, 'dd-MM-yyyy')}`
  } else if (matchDate.getMonth() === tomorrowDate.getMonth() && matchDate.getDate() === tomorrowDate.getDate()) {
    return `Jutro, ${format(matchDate, 'dd-MM-yyyy')}`
  } else {
    return format(matchDate, 'dd-MM-yyyy')
  }
}

</script>

<style scoped>

.item-wrapper{

}

.date-separator{
  padding: 6px;
}

.items-container{
  /*background-color: #0000009e;*/
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: column;
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