<template>
 <div class="register-page">
    <DefaultLayout showNavigationBar>
      <div class="main-items-container">
        <div class="register-panel-wrapper">
          <Transition
              name="item-transition"
              appear
              v-if="!isRegisterFinished"
          >
            <ModalComponent>
              <RegisterPanel @submit="isRegisterFinished=true"/>
            </ModalComponent>
          </Transition>
          <Transition
              name="item-transition"
              appear
              v-else
          >
            <ModalComponent>
              <RegisterMessage/>
            </ModalComponent>
          </Transition>
        </div>
      </div>
    </DefaultLayout>
 </div>
</template>

<script setup lang="ts">
import DefaultLayout from "../DefaultLayout.vue";
import ModalComponent from "../basic/ModalComponent.vue";
import RegisterPanel from "../auth/RegisterPanel.vue";
import {$ref} from "vue/macros";
import RegisterMessage from "../auth/RegisterMessage.vue";

const isRegisterFinished = $ref(false)
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

.register-panel-wrapper{
  position: absolute;
  top: 150px;
  margin-top: 50px;
}

.register-page {
  width: 100%;
}
</style>