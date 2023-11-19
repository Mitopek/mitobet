
<template>
  <div class="navigation-bar">
<!--    <div class="left-panel">-->
<!--      <div class="navigation-item" v-for="route in routes" @click="router.push(route.path)">-->
<!--        <i :class="route.iconClass"></i>-->
<!--        <span>{{route.title}}</span>-->
<!--      </div>-->
<!--    </div>-->
    <div class="menu-button-wrapper">
      <i class="fa-solid fa-bars fa-2x"/>
    </div>
    <div class="logo-container">
      <img src="/logo-big.png" alt="logo" class="logo"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'
const router = useRouter()
const routes = [
   {
     path: '/',
     title: 'Strona głowna',
     iconClass: 'fa-solid fa-house'
   },
   {
     path: '/register',
     title: 'Rejestracja',
     iconClass: 'fa-solid fa-key'
   },
   {
     path: '/',
     title: 'Zadaj pytanie',
     iconClass: 'fa-solid fa-message'
   },
 ]
</script>

<style scoped lang="scss">
@use '../variables.scss' as variables;

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
  border-bottom: 1px solid #0000009e;
  border-left: 1px solid #0000009e;
  border-right: 1px solid #0000009e;
}

.navigation-item{
  display: flex;
  gap: 6px;
  align-items: center;
  cursor: pointer;
  padding: 4px 8px;
  &:hover{
    transition: all 0.2s ease-in-out;
    color: map-get(variables.$colors, primary);
  }
}
</style>