<template>
 <div class="main-page">
    <DefaultLayout>
      <div class="main-image-container">
        <div class="image"/>
      </div>
      <div class="main-items-container">
        <div class="login-panel-wrapper">
          <ModalComponent>
            <LoginPanel/>
          </ModalComponent>
        </div>
        <div class="arrow-wrapper">
          <AnimatedArrowButton/>
        </div>
      </div>
      <div class="content">
        <MainTextContent/>
        <PricesContent/>
      </div>
    </DefaultLayout>
 </div>
</template>

<script setup lang="ts">

import DefaultLayout from "../DefaultLayout.vue";
import LoginPanel from "../LoginPanel.vue";
import AnimatedArrowButton from "../AnimatedArrowButton.vue";
import PricesContent from "../SubscriptionsContent.vue";
import ModalComponent from "../basic/ModalComponent.vue";
import MainTextContent from "../MainTextContent.vue";
</script>

<style scoped>

.content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 10%;
}

.main-image-container{
  height: 75%;
  overflow: hidden;
}

.image{
  background-image: url('background.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  position: relative;
  /*top: -20vh;*/
  height: 100vh;
}

.main-items-container{
  position: absolute;
  top: 0;
  height: 75%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login-panel-wrapper{
  margin-top: 200px;
}

.arrow-wrapper {
  margin-top: 40px;
}

.main-page {
  width: 100%;
  height: 1000px;
}
</style>