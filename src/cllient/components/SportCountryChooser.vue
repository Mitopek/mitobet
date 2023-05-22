<template>
  <div class="sport-discipline-chooser">
    <div class="items-container">
      <SportLeagueChooser v-for="country in props.countries" :country="country" :chosenLeagueId="props.chosenLeagueId"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import SportLeagueChooser from "./SportLeagueChooser.vue";
import {IGetCountriesRequest} from "../../server/controllers/CountryController/types/IGetCountriesRequest.js";

interface Props {
  countries: IGetCountriesRequest['response']
  chosenLeagueId: number,
}

interface Emits {
  (e: 'choose', league: string): void
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
  &.is-chosen {
    color: #13beff;
    border: 2px solid #13beff;
  }
}

.items-container{
  padding: 12px;
  display: flex;
  flex-flow: column;
  gap: 4px;
}




</style>