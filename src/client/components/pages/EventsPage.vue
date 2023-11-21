<template>
  <DefaultLayout showNavigationBar>
    <div class="events-page">
        <div/>
        <div class="chooser-wrapper">
          <SportLeagueChooser :fixtures="fixtures" :chosenLeagueName="chosenLeague" @choose="onLeagueChange" @search="onSearch"/>
        </div>
        <div/>
        <div class="content-container">
          <SportEventChooser v-if="leagueMatches" :matches="leagueMatches"/>
        </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "../DefaultLayout.vue";
import LoginPanel from "../auth/LoginPanel.vue";
import AnimatedArrowButton from "../AnimatedArrowButton.vue";
import PricesContent from "../SubscriptionsContent.vue";
import ModalComponent from "../basic/ModalComponent.vue";
import MainTextContent from "../MainTextContent.vue";
import SportDisciplineChooser from "../SportDisciplineChooser.vue";
import SportLeagueChooser from "../SportLeagueChooser.vue";
import SportEventChooser from "../SportEventChooser.vue";
import {$, $computed, $ref} from "vue/macros";
import {IGetFixturesRequest} from "../../../server/controllers/FixtureController/types/IGetFixturesRequest.js";
import {SportDisciplineType} from "../../../server/services/OddsService/enum/SportDisciplineType.js";
import {onMounted} from "vue";
import {useFixtures} from "../../composables/useFixtures.js";

const {getFixtures} = $(useFixtures())

const message = $ref('')
let outputMessage = $ref('')
let search = $ref('')
let chosenLeague = $ref('')
let fixtures = $ref<IGetFixturesRequest['response']['fixtures']|null>(null)

const onSearch = (value: string) => {
  search = value
  chosenLeague = ''
}

const onLeagueChange = (value: string) => {
  search = ''
  chosenLeague = value
}

const leagueMatches = $computed(() => {
  if(!fixtures) {
    return null
  }
  if(search) {
    const matches = fixtures.flatMap(fixture => fixture.leagues.flatMap(league => league.matches))
    return matches.filter(match => [match.away_name, match.home_name].some(item => item.toLowerCase().includes(search.toLowerCase()))).sort((matchA, matchB) => {
      return matchA.date_unix - matchB.date_unix
    })
  }
  if(!chosenLeague) {
    return null
  }
  for(const fixture of fixtures) {
    const matches = fixture.leagues.find(league => league.name === chosenLeague)?.matches
    if(matches) {
      return matches
    }
  }
  return null
})

onMounted(async () => {
  fixtures = await getFixtures()
})


</script>

<style scoped>

.events-page{
  grid-template-columns: 5% 400px 1fr 400px 5%;
  gap: 8px;
  display: grid;
  height: 100%;
  width: 100%;
  padding: 80px 0;
}

.chooser-wrapper{
  background-color: #131311;
  overflow: auto;
  border-radius: 10px;
  margin-left: 5%;
  width: 400px;
  position: fixed;
}

.content-container{
  padding: 10px;
  display: flex;
  flex-flow: column;
  gap: 8px;
}

</style>