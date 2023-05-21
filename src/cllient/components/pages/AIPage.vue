<template>
  <div class="ai-page">
    <div class="chooser-wrapper">
      <SportDisciplineChooser :chosenType="tempType" :sportDisciplines="sportDisciplines" @choose="value => tempType = value"/>
    </div>
    <div class="chooser-wrapper">
      <SportLeagueChooser :sportLeagues="sportLeagues"/>
    </div>
    <div class="content-container">
      <SportEventChooser :chosenMatch="null"/>
      <InputComponent v-model="message"/>
      <ButtonComponent @click="onEnter">Wyslij</ButtonComponent>
      {{outputMessage}}
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
import {$computed} from "vue/macros.js";
import {SportDisciplines} from "../../../server/services/OddsService/enum/SportDisciplines.js";
import SportLeagueChooser from "../SportLeagueChooser.vue";

const {sendMessage} = $(useAI())
const {getSports} = $(useSports())

let sports = $ref<{
  group: string,
  titles: string[]
}[] | null>(null)
const message = $ref('')
let outputMessage = $ref('')
const tempType = $ref(SportDisciplineType.Football)

const onEnter = async () => {
  outputMessage = (await sendMessage(message)).payload?.message
}

const sportDisciplines = $computed(() => {
  if(!sports) {
    return null
  }
  return SportDisciplines.filter(discipline => sports?.find(sport => sport.group === discipline.oddGroupName))
})

const chosenSportDiscipline = $computed(() => {
  return sportDisciplines?.find(sportDiscipline => sportDiscipline.type === tempType)
})

const sportLeagues = $computed(() => {
  return sports?.find(sport => sport.group === chosenSportDiscipline?.oddGroupName)?.titles
})

onMounted(async () => {
  sports = await getSports()
})

</script>

<style scoped>
.ai-page{
  grid-template-columns: 130px 240px 1fr;
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