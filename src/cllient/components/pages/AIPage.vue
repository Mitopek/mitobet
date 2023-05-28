<template>
  <div class="ai-page">
    <div class="chooser-wrapper">
      <SportDisciplineChooser :chosenType="sportDisciplineType" :sportDisciplines="sportDisciplines" @choose="onSportDisciplineChange"/>
    </div>
    <div class="chooser-wrapper">
      <SportLeagueChooser :fixtures="fixtures" :chosenLeagueName="leagueName" @choose="onLeagueChange" @search="onSearch"/>
    </div>
    <div class="content-container">
      <SportEventChooser v-if="leagueMatches" :matches="leagueMatches"/>
<!--      <InputComponent v-model="message"/>-->
<!--      <ButtonComponent @click="onEnter">Wyslij</ButtonComponent>-->
<!--      {{outputMessage}}-->
    </div>
  </div>
</template>

<script setup lang="ts">
import InputComponent from "../basic/InputComponent.vue";
import {useAuth} from "../../composables/useAuth.js";
import {useAI} from "../../composables/useAI.js";
import {$ref, $} from "vue/macros";
import ButtonComponent from "../basic/ButtonComponent.vue";
import SportDisciplineChooser from "../SportDisciplineChooser.vue";
import SportEventChooser from "../SportEventChooser.vue";
import {SportDisciplineType} from "../../../server/services/OddsService/enum/SportDisciplineType.js";
import {useSports} from "../../composables/useSports.js";
import {onMounted} from "vue";
import {$computed} from "vue/macros";
import {SportDisciplines} from "../../../server/services/OddsService/enum/SportDisciplines.js";
import SportLeagueChooser from "../SportLeagueChooser.vue";
import {useFixtures} from "../../composables/useFixtures.js";
import {IGetFixturesRequest} from "../../../server/controllers/FixtureController/types/IGetFixturesRequest.js";

const {sendMessage} = $(useAI())
const {getSports} = $(useSports())
const {getFixtures} = $(useFixtures())

let sports = $ref<{
  group: string,
  titles: string[]
}[] | null>(null)


const message = $ref('')
let outputMessage = $ref('')
let search = $ref('')


let sportDisciplineType = $ref(SportDisciplineType.Football)
let leagueName = $ref('')

let fixtures = $ref<IGetFixturesRequest['response']['fixtures']|null>(null)

const onEnter = async () => {
  outputMessage = (await sendMessage(message)).payload?.message
}

const onSearch = (value: string) => {
  search = value
  leagueName = ''
}

const onLeagueChange = (value: string) => {
  search = ''
  leagueName = value
}

const onSportDisciplineChange = async (type: SportDisciplineType) => {
  sportDisciplineType = type
  fixtures = await getFixtures()
}

const sportDisciplines = $computed(() => {
  if(!sports) {
    return null
  }
  return SportDisciplines.filter(discipline => sports?.find(sport => sport.group === discipline.oddGroupName))
})

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
  if(!leagueName) {
    return null
  }
  for(const fixture of fixtures) {
    const matches = fixture.leagues.find(league => league.name === leagueName)?.matches
    if(matches) {
      return matches
    }
  }
  return null
})

// const chosenSportDiscipline = $computed(() => {
//   return sportDisciplines?.find(sportDiscipline => sportDiscipline.type === tempType)
// })
//
// const onLeagueChoose = (league: string) => {
//   tempLeague = league
// }

onMounted(async () => {
  sports = await getSports()
})

</script>

<style scoped>
.ai-page{
  grid-template-columns: 130px 300px 1fr;
  display: grid;
  height: 100%;
  width: 100%;
}

.chooser-wrapper{
  background-color: #0000009e;
  overflow: auto;
}

.content-container{
  padding: 10px;
  display: flex;
  flex-flow: column;
  gap: 8px;
}


</style>