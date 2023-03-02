<template>
 <div class="main-page">
    <DefaultLayout>
      <div class="main-items-container">
        <div class="login-panel-wrapper">
          <ModalComponent>
            <RegisterPanel/>
          </ModalComponent>
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
import RegisterPanel from "../RegisterPanel.vue";
</script>

<style scoped>
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
  margin-top: auto;
}

.main-page {
  width: 100%;
  height: 1000px;
}
</style>