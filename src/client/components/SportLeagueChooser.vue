<template>
  <div class="sport-league-chooser">
    <div class="search-wrapper">
      <InputComponent placeholder="Wyszukaj mecz" @change="value => emit('search', value)"/>
    </div>
    <div class="items-container">
      <CountryLeagueChooser v-for="fixture in props.fixtures" :fixture="fixture" :chosenLeagueName="chosenLeagueName" @choose="value => chosenLeagueName = value"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {$computed, $ref} from "vue/macros";
import CountryLeagueChooser from "./CountryLeagueChooser.vue";
import {IMappedMatch} from "../../server/adapters/MatchAdapter/types/IMappedMatch.js";
import InputComponent from "./basic/InputComponent.vue";

interface Props {
  fixtures: {
    country: {
      name: string,
      code: string,
      flag: string,
    }
    leagues: {
      name: string,
      image: string,
      matches: IMappedMatch[]
    }[]
  }[] | null
  chosenLeagueName: string,
}

interface Emits {
  (e: 'choose', chosenLeagueName: string): void
  (e: 'search', value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const search = $ref('')

const chosenLeagueName = $computed({
  get() {
    return props.chosenLeagueName
  },
  set(value){
    emit('choose', value)
  }
})


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
  &.is-chosen {
    color: #13beff;
    border: 2px solid #13beff;
  }
}

.search-wrapper{
  padding: 12px;
}

.items-container{
  padding: 12px;
  display: flex;
  flex-flow: column;
  gap: 4px;
}

</style>