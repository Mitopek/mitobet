
<template>
  <div class="navigation-bar">
    <div class="menu-button-wrapper">
      <i class="fa-solid fa-bars fa-2x" @click="isMenuToggled=!isMenuToggled"/>
      <Transition name="item-transition" appear>
        <div v-if="isMenuToggled" class="menu-container">
          <div class="top-panel">
            <i class="fa-solid fa-times fa-2x" @click="isMenuToggled=!isMenuToggled"/>
          </div>
          <div :class="['navigation-item', {'is-active': router.currentRoute.value.name === route.name}]" v-for="route in routes" @click="router.push(route.path)">
            <span>{{route.title}}</span>
          </div>
        </div>
      </Transition>
    </div>
    <div class="logo-container">
      <img src="/logo-big.png" alt="logo" class="logo"/>
    </div>
    <div class="overlay" v-if="isMenuToggled" @click="isMenuToggled=!isMenuToggled"/>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'
import {$computed, $ref} from "vue/macros";
import {RouterName} from "../enum/RouterName.js";
const router = useRouter()
const routes = [
   {
     path: '/',
     title: 'Strona głowna',
     name: RouterName.Home,
   },
   {
     path: '/register',
     title: 'Rejestracja',
     name: RouterName.Register,

   },
   {
     path: '/',
     title: 'Zadaj pytanie',
      name: null,
   },
 ]

const isMenuToggled = $ref(false)

</script>

<style scoped lang="scss">
@use '../variables.scss' as variables;

.item-transition {
  &-enter-active {
    transition: all .25s ease-in-out;
  }
  &-leave-active {
    transition: all .25s ease-in-out;
  }
  &-enter-active,
  &-leave-active {
    transition: all .25s ease-in-out;
  }
}

.item-transition-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}

.item-transition-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.item-transition-enter-to,
.item-transition-leave {
  opacity: 1;
  transform: translateX(0);
}

.item-transition-leave-active,
.item-transition-enter-active {
  transition: all .25s ease-in-out;
}

.logo-container {
  max-width: 90%;
  max-height: 60px;
  justify-self: center;
}

.profile-container{
  display: flex;
  gap: 6px;
  align-items: center;
}

.menu-button-wrapper{
  padding: 4px;
  align-self: center;
  cursor: pointer;
}

.logo {
  height: 100px;
  border-radius: 50%;
  box-shadow: 0 0 0 1px #0000009e;
  margin-top: 10px;
}

.left-panel{
  display: flex;
  gap: 10px;
}


.right-panel{
  display: flex;
  align-items: center;
  font-size: 16px;
  gap: 10px;
  justify-content: right;
}

.navigation-bar{
  padding: 0 20px;
  color: #f9f9f9;
  width: 100%;
  font-size: 14px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 4px;
  box-shadow: 0 0 64px rgba(0,0,0,.3);
  background: map-get(variables.$colors, surface);
  z-index: 1100;
}

.menu-icon{
  color: map-get(variables.$colors, onSurfaceLow);
  &:hover{
    transition: all 0.2s ease-in-out;
    color: map-get(variables.$colors, primary);
  }
}

.navigation-item{
  display: flex;
  gap: 6px;
  align-items: center;
  cursor: pointer;
  padding: 12px 0;
  &:hover{
    transition: all 0.2s ease-in-out;
    color: map-get(variables.$colors, primary);
  }
  &.is-active{
    color: map-get(variables.$colors, primary);
  }
}

.menu-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 100vh;
  background: map-get(variables.$colors, surfaceMediumHigh);
  padding: 8px 16px;
  z-index: 1000;
  font-size: 16px;
}

.overlay{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  opacity: 0.3;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 900;
}

.top-panel{
  display: flex;
  justify-content: flex-end;
  padding: 8px 0 16px 0;
  gap: 8px;
  border-bottom: 1px solid #a0a0a0;
  margin-bottom: 16px;
}

</style>