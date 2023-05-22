<template>
  <div class="sport-discipline-chooser">
    <div class="items-container">
      <div v-if="!isToggled">
        <CountryItem :name="props.country.countryName" :flag="props.country.countryFlag"/>
      </div>
      <div v-else>
        <div v-for="league in props.country.leagues" :class="['item-wrapper', {'is-chosen': props.chosenLeagueId === league.id}]" @click="emit('choose', league.id)">
          {{league.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SportDisciplineItem from "./SportDisciplineItem.vue";
import {SportDisciplines} from "../../server/services/OddsService/enum/SportDisciplines.js";
import {SportDisciplineType} from "../../server/services/OddsService/enum/SportDisciplineType.js";
import {$computed, $ref, $} from "vue/macros";
import CountryItem from "./CountryItem.vue";

interface Props {
  country: {
    countryName: string,
    countryFlag: string,
    leagues: {
      id: number,
      name: string,
      type: string,
      logo: string,
    }[]
  }
  chosenLeagueId: number
}

interface Emits {
  (e: 'choose', leagueId: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isToggled = $ref(false)

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