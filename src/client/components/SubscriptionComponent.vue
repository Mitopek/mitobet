<template>
  <div class="vip-price-component">
    <div class="duration">
      {{props.title}}
    </div>
    <div/>
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
  price: number,
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

ul{
  text-align: left;
}
  .price{
    word-spacing: -4px;
    font-size: 2rem;
  }

.duration {
  font-size: 2rem;
  height: 100%;
  background: #353535;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}
.price-description{
  align-self: flex-start;
}

.full-price{
  font-size: 14px;
  color: #9db48b;
}


  .button-wrapper{
    display: flex;
    justify-content: center;
  }

  .vip-price-component{
    text-align: center;
    grid-template-rows: 3fr 2fr 2fr 1fr 1fr 4fr 4fr;
    display: grid;
    height: 300px;
    max-width: 300px;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    align-items: center;
    border-radius: 16px;
    box-shadow: 1rem 1rem 1rem 1rem rgba(0,0,0,0.1);
    border: rgba(0,0,0,0.1) 1px solid ;
    background-color:  map-get(variables.$colors, surfaceLowest);
    outline-offset: -2px;
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: scale(1.05);
    }
  }

.descriptions-container{
  width: 100%;
  border-top: 1px solid #514d4d;
  height: 100%;
  box-sizing: border-box;
}

li{
  padding-right: 20px;
}
</style>