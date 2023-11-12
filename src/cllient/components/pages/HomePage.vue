<template>
 <div class="main-page">
    <DefaultLayout showNavigationBar>
      <div class="main-items-container" ref="mainContainerRef">
        <div class="login-panel-wrapper">
          <Transition
              name="item-transition"
              appear
          >
            <ModalComponent>
              <LoginPanel/>
            </ModalComponent>
          </Transition>
        </div>
        <div class="arrow-wrapper">
          <AnimatedArrowButton @click="onArrowClick"/>
        </div>
      </div>
      <div class="content-wrapper" ref="contentRef">
        <div class="content">
          <MainTextContent/>
          <PricesContent @click="onBuyClick"/>
        </div>
      </div>
    </DefaultLayout>
 </div>
</template>

<script setup lang="ts">
import DefaultLayout from "../DefaultLayout.vue";
import LoginPanel from "../auth/LoginPanel.vue";
import AnimatedArrowButton from "../AnimatedArrowButton.vue";
import PricesContent from "../SubscriptionsContent.vue";
import ModalComponent from "../basic/ModalComponent.vue";
import MainTextContent from "../MainTextContent.vue";
import {$ref} from "vue/macros";

const mainContainerRef = $ref(null)
const contentRef = $ref(null)

const onBuyClick = () => {
  mainContainerRef.scrollIntoView({behavior: 'smooth'})
}

const onArrowClick = () => {
  contentRef.scrollIntoView({behavior: 'smooth'})
}

</script>

<style scoped lang="scss">
@use '../../variables.scss' as variables;

.item-transition {
  &-enter-active {
    transition: all .25s ease-in-out;
  }
  &-leave-active {
    transition: all .25s ease-in-out;
  }
  &-enter-active,
  &-leave-active {
    transform: translateX(0);
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateX(-2px);
  }
}

.content-wrapper{
  background: map-get(variables.$colors, surface);
  display: flex;
  padding: 60px 40px;
  justify-content: center;
}

.content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  padding: 40px;
  border-radius: 8px;
  background: map-get(variables.$colors, surfaceLow);
}

.main-items-container{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login-panel-wrapper{
  margin-top: 100px;
}

.arrow-wrapper {
  margin: 40px 0 30px 0;
}

.main-page {
  width: 100%;
}
</style>