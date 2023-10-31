<template>
  <div class="vip-price-component">
    <div class="duration">
      {{props.title}}
    </div>
    <div class="extra-time">
      + 3 MIESIĄCE GRATIS
    </div>
    <div class="price">
      {{props.pricePerMonth}} zł
    </div>
    <div class="price-description">
      za miesiąc
    </div>
    <div class="button-wrapper">
      <ButtonComponent>
        <i class="fa-solid fa-cart-shopping"></i> Kup teraz
      </ButtonComponent>
    </div>
    <div class="descriptions" v-for="description in props.descriptions">
      {{description}}
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from "./basic/ButtonComponent.vue";

interface IProps{
  title: string,
  pricePerMonth: number,
  descriptions: string[]
}
const props = defineProps<IProps>()

</script>

<style scoped lang="scss">
@use '../variables.scss' as variables;

.price{
  word-spacing: -4px;
  font-size: 2.2rem;
}

.price-description{
}

.duration {
  font-size: 2.4rem;
}

.extra-time{
  border-radius: 15px;
  background-color: map-get(variables.$colors, primaryDarknest);
  align-self: center;
  padding: 5px 15px;
  justify-self: center;
}

.vip-price-component{
  text-align: center;
  grid-template-rows: 45px 75px 50px 30px 70px 30px auto;
  display: grid;
  height: 400px;
  width: 400px;
  box-sizing: border-box;
  justify-content: center;
  padding: 10px;
  border-radius: 1.6rem;
  box-shadow: 1rem 1rem 1rem 1rem rgba(0,0,0,0.1);
  background-color:  map-get(variables.$colors, surfaceLowest);
  outline-offset: -2px;
}

.button-wrapper{
  display: flex;
  justify-content: center;
}
</style>