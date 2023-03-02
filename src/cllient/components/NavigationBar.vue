<template>
  <div class="navigation-bar">
    <div class="logo-container">
      <img src="/logo.jpg" alt="logo" class="logo"/>
    </div>
    <div class="navigation-item" v-for="route in routes" @click="router.push(route.path)">
      <i :class="route.iconClass"></i>
      <span>{{route.title}}</span>
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
     path: '/ss',
     title: 'Kupony',
     iconClass: 'fa-sharp fa-solid fa-money-check-dollar'
   },
   {
     path: '/',
     title: 'VIP',
     iconClass: 'fa-solid fa-store'
   },
   {
     path: '/',
     title: 'Zadaj pytanie',
     iconClass: 'fa-solid fa-message'
   },
 ]
</script>

<style scoped>
.logo-container {
  width: 25px;
  display: flex;
  align-items: center;
}

.logo {
  height: 70%;
  border-radius: 50%;
}

.navigation-bar{
  color: #FFFFD6;
  width: 100%;
  font-size: 18px;
  display: flex;
  justify-content: center;
  gap: 20px;
  height: 50px;
  background-color: #010005;
}

.navigation-item{
  display: flex;
  gap: 6px;
  align-items: center;
  cursor: pointer;
  padding: 4px 8px;
}
</style>