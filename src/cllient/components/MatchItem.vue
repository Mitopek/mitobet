<template>
  <div class="match-item">
    <div class="header">
      <CountryItem :flag="props.match.countryFlag" :name="props.match.countryName"/> - {{startTime}}
    </div>
    <div class="main-container">
      <div/>
      <div class="teams-container">
        <div class="home-team-wrapper">
          <div class="flag-wrapper">
            <img :src="homeLogo" alt="" class="flag"/>
          </div>
          <span class="team">{{props.match.home_name}}</span>
        </div>
        <div class="team-separator">-</div>
        <div class="away-team-wrapper">
          <span class="team">{{props.match.away_name}}</span>
          <div class="flag-wrapper">
            <img :src="awayLogo" alt="" class="flag"/>
          </div>
        </div>
      </div>
      <div class="button-wrapper">
        <ButtonComponent>Wybierz</ButtonComponent>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {IMappedMatch} from "../../server/adapters/MatchAdapter/types/IMappedMatch.js";
import {$computed} from "vue/macros";
import {format} from 'date-fns'
import ButtonComponent from "./basic/ButtonComponent.vue";
import CountryItem from "./CountryItem.vue";

interface Props {
  match: IMappedMatch
}

const props = defineProps<Props>()

const homeLogo = $computed(() => {
  return `${import.meta.env.VITE_FOOTYSTATS_IMAGES_URL}/${props.match.home_image}`
})

const awayLogo = $computed(() => {
  return `${import.meta.env.VITE_FOOTYSTATS_IMAGES_URL}/${props.match.away_image}`
})

const startTime = $computed(() => {
  const todayDate = new Date()
  const tomorrowDate = new Date()
  tomorrowDate.setDate(todayDate.getDate() + 1)
  const matchDate = new Date(props.match.date_unix * 1000)
  let date = ''
  if(matchDate.getMonth() === todayDate.getMonth() && matchDate.getDate() === todayDate.getDate()) {
    date = 'Dzisiaj'
  } else if (matchDate.getMonth() === tomorrowDate.getMonth() && matchDate.getDate() === tomorrowDate.getDate()) {
    date = 'Jutro'
  } else {
    date = format(matchDate, 'dd-MM-yyyy')
  }
  const time = format(matchDate, 'HH:mm')
  return `${date} ${time}`
})
</script>

<style scoped>
.match-item{
  padding: 8px 12px 18px 12px;
  border-radius: 10px;
  background-color: #0000009e;
  display: flex;
  flex-direction: column;
}

.main-container{
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  justify-items: center;
}

.team{
  /*font-weight: 500;*/
  white-space: pre;
}

.button-wrapper{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  height: 100%;
}

.flag-wrapper {
  width: 22px;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.flag{
  width: 130%;
  height: 130%;
  /*border-radius: 50%;*/
}

.teams-container{
  display: grid;
  grid-template-columns: 2fr 20px 2fr;
  align-items: center;
  gap: 8px;
  padding-left: 8px;
}

.home-team-wrapper{
  display: flex;
  justify-self: end;
  align-items: center;
  padding: 5px;
  gap: 8px
}

.away-team-wrapper{
  display: flex;
  justify-self: start;
  align-items: center;
  padding: 5px;
  gap: 8px
}

.team-separator{
  justify-self: center;
}

.header{
  padding: 4px 0 0 4px;
  display: flex;
  gap: 4px;
  font-size: 13px;
  word-spacing: 4px;
  margin-bottom: 8px;
  white-space: pre;
}
</style>