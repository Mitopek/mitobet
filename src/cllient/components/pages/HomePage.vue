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
import LoginPanel from "../auth/LoginPanel.vue";
import AnimatedArrowButton from "../AnimatedArrowButton.vue";
import PricesContent from "../SubscriptionsContent.vue";
import ModalComponent from "../basic/ModalComponent.vue";
import MainTextContent from "../MainTextContent.vue";

</script>

<style scoped lang="scss">
@use '../../variables.scss' as variables;

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