<template>
  <div class="vip-price-component">
    <div class="duration">
      {{props.title}}
    </div>
    <div class="descriptions-container">
      <div class="description" v-for="description in props.descriptions">
        •{{description}}
      </div>
    </div>
    <div class="price">
      {{props.pricePerMonth}} zł
    </div>
    <div class="price-description">
      za miesiąc
    </div>
    <div class="full-price">
      (razem {{props.price}} zł)
    </div>
    <div class="button-wrapper">
      <ButtonComponent @click="emit('click')">
        <i class="fa-solid fa-cart-shopping"></i> Kliknij, aby kupić
      </ButtonComponent>
    </div>
    <div class="bonus" v-if="bonus">
      {{props.bonus}}
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from "./basic/ButtonComponent.vue";

interface IProps{
  title: string,
  pricePerMonth: number,
  descriptions: string[]
  price: number,
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
  .price{
    word-spacing: -4px;
    font-size: 1.8rem;
  }

  .duration {
    font-weight: 500;
    font-size: 2.2rem;
  }

  .bonus{
    border-radius: 15px;
    background-color: map-get(variables.$colors, primaryDarknest);
    align-self: center;
    padding: 4px 12px;
    justify-self: center;
    position: absolute;
    top: -16px;
    right: -12px;
  }

  .button-wrapper{
    display: flex;
    justify-content: center;
  }

  .vip-price-component{
    text-align: center;
    grid-template-rows: 75px 120px 40px 24px 28px auto;
    display: grid;
    height: 364px;
    width: 300px;
    box-sizing: border-box;
    justify-content: center;
    padding: 16px 8px;
    box-shadow: 1rem 1rem 1rem 1rem rgba(0,0,0,0.1);
    border: rgba(0,0,0,0.1) 1px solid ;
    background-color:  map-get(variables.$colors, surfaceLowest);
    outline-offset: -2px;
    position: relative;
  }

  .descriptions-container{
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: left;
  }

  .full-price{
    font-size: 13px;
    color: #9db48b;
  }
</style>