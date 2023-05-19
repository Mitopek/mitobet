<template>
 <div class="main-page">
    <DefaultLayout showNavigationBar>
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

.content-wrapper{
  background: #0000009e;
}

.content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 17%;
  padding: 40px 0;
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
  margin: 0 0 30px 0;
}

.main-page {
  width: 100%;
}
</style>