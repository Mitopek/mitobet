<template>
  <div class="vip-price-component">
    <div class="duration">
      {{props.title}}
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

interface Emits {
  (e: 'click'): void
}

const emit = defineEmits<Emits>()

</script>

<style scoped lang="scss">
@use '../variables.scss' as variables;
  .price{
    word-spacing: -4px;
    font-size: 1.8rem;
  }

  .duration {
    font-weight: 500;
    font-size: 2.2rem;
  }

  .button-wrapper{
    display: flex;
    justify-content: center;
  }

  .vip-price-component{
    text-align: center;
    grid-template-rows: 75px 40px 30px 65px auto;
    display: grid;
    height: 300px;
    max-width: 300px;
    width: 100%;
    box-sizing: border-box;
    justify-content: center;
    padding: 10px;
    border-radius: 1.6rem;
    box-shadow: 1rem 1rem 1rem 1rem rgba(0,0,0,0.1);
    border: rgba(0,0,0,0.1) 1px solid ;
    background-color:  map-get(variables.$colors, surfaceLowest);
    outline-offset: -2px;
  }
</style>