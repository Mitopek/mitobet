<template>
  <div class="vip-price-component">
    <div class="duration">
      {{props.title}}
    </div>
    <div class="extra-time" v-if="bonus">
      {{ bonus }}
    </div>
    <div class="price">
      {{props.pricePerMonth}} zł
    </div>
    <div class="price-description">
      za miesiąc
    </div>
    <div class="button-wrapper">
      <ButtonComponent @click="emit('click')">
        <i class="fa-solid fa-cart-shopping"></i> Zaloguj się, aby kupić
      </ButtonComponent>
    </div>
    <div class="descriptions-container">
      <ul>
        <li v-for="description in props.descriptions">
          {{description}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from "./basic/ButtonComponent.vue";

interface IProps{
  title: string,
  pricePerMonth: number,
  descriptions: string[]
  bonus?: string
}
const props = withDefaults(defineProps<IProps>(), {
  bonus: null
})

interface Emits {
  (e: 'click'): void
}

const emit = defineEmits<Emits>()

</script>

<style scoped lang="scss">
@use '../variables.scss' as variables;

ul {
  text-align: left;
}

.price{
  word-spacing: -4px;
  font-size: 2.2rem;
  align-self: flex-end;
}

.duration {
  font-size: 2.4rem;
  height: 100%;
  background: #353535;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}

.price-description{
  padding: 6px;
  align-self: flex-start;
}

.extra-time{
  border-radius: 15px;
  background-color: map-get(variables.$colors, primaryDarknest);
  padding: 5px 15px;
  justify-self: center;
  align-self: flex-end;
}

.vip-price-component{
  text-align: center;
  display: grid;
  height: 400px;
  max-width: 400px;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  /* padding: 16px; */
  border-radius: 1.6rem;
  box-shadow: 1rem 1rem 1rem 1rem rgba(0, 0, 0, 0.1);
  overflow: hidden;
  grid-template-rows: 2.5fr 2fr 2fr 2fr 3fr 5fr;
  background-color:  map-get(variables.$colors, surfaceLowest);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
}

.descriptions-container{
  width: 100%;
  border-top: 1px solid #514d4d;
  height: 100%;
}

.button-wrapper{
  display: flex;
  justify-content: center;
  align-self: flex-start;
}
</style>