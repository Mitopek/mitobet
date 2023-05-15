<template>
 <div class="register-page">
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
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login-panel-wrapper{
  position: absolute;
  top: 150px;
  margin-top: 50px;
}
</style>