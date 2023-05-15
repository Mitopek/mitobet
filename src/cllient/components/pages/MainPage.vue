<template>
 <div class="main-page">
    <DefaultLayout>
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
      <div class="fading-element"/>
      <div class="content-wrapper">
        <div class="content">
          <MainTextContent/>
          <PricesContent/>
        </div>
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

.fading-element {
  height: 5px;
  background: linear-gradient(to top, rgba(23, 43, 61, 1), rgba(23, 43, 61, 0));
}


.content-wrapper{
  background-color: #172b3d;
}

.content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 10%;
}

.main-items-container{
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