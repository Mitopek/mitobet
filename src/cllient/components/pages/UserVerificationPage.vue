<template>
 <div class="register-page">
    <DefaultLayout showNavigationBar>
      <div class="main-items-container">
        <Transition
            name="item-transition"
            appear
        >
          <ModalComponent>
            <UserVerificationPanel/>
          </ModalComponent>
        </Transition>
      </div>
    </DefaultLayout>
 </div>
</template>

<script setup lang="ts">

import DefaultLayout from "../DefaultLayout.vue";
import ModalComponent from "../basic/ModalComponent.vue";
import ResetPasswordPanel from "../auth/ResetPasswordPanel.vue";
import UserVerificationPanel from "../auth/UserVerificationPanel.vue";
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

.main-items-container{
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.register-page {
  width: 100%;
}
</style>