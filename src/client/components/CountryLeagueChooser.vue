<template>
  <div class="country-league-chooser">
    <div class="items-container">
      <div class="country-item-container" @click="isToggled = !isToggled">
        <CountryItem :name="props.fixture.country.name" :flag="props.fixture.country.flag"/>
        <div class="toggle-arrow-wrapper">
          <i :class="['fa-solid fa-angle-down','arrow-icon', {'is-toggled': isToggled}]"></i>
        </div>
      </div>
      <transition name="fadeHeight">
        <div v-if="isToggled" :class="['leagues-container', {'is-toggled': isToggled}]">
          <div v-for="league in props.fixture.leagues" :class="['item-wrapper', {'is-chosen': props.chosenLeagueName === league.name}]" @click="emit('choose', league.name)">
            {{league.name}}
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import {$computed, $ref, $} from "vue/macros";
import CountryItem from "./CountryItem.vue";
import {IMappedMatch} from "../../server/adapters/MatchAdapter/types/IMappedMatch.js";

interface Props {
  fixture: {
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
  }
  chosenLeagueName: string
}

interface Emits {
  (e: 'choose', leagueName: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isToggled = $ref(false)

</script>

<style scoped lang="scss">


.fadeHeight-enter-active {
  opacity: 0;
  max-height: 0;
}
.fadeHeight-leave-active {
  opacity: 1;
  max-height: 100vh;
}
.fadeHeight-enter,
.fadeHeight-leave-to
{
  opacity: 0;
  max-height: 0;
}

.fadeHeight-enter-to,
.fadeHeight-leave {
  opacity: 1;
  max-height: 100vh;
}

.sport-discipline-chooser{
  height: 100%;
}

.country-item-container{
  display: flex;
  align-items: center;
  cursor: pointer;
}

.toggle-arrow-wrapper{
  width: 100%;
  display: flex;
  justify-content: right;
  padding: 4px;
}

.arrow-icon {
  transition: all 300ms;
  &.is-toggled{
    transform: rotate(-180deg);
  }
}

.leagues-container{
  margin-left: 4px;
  //padding: 4px;
  border-left: 1px solid #363638;
  transition: all 0.4s;
  overflow: hidden;
}

.item-wrapper{
  padding: 6px 12px;
  font-size: 15px;
  cursor: pointer;
  box-sizing: border-box;
  transition: background-color .4s ease;
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