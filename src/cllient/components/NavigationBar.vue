<template>
  <div class="navigation-bar">
    <div class="left-panel">
      <div class="navigation-item" v-for="route in routes" @click="router.push(route.path)">
        <i :class="route.iconClass"></i>
        <span>{{route.title}}</span>
      </div>
    </div>
    <div class="logo-container">
      <img src="/logo-transparent.png" alt="logo" class="logo"/>
    </div>
    <div class="right-panel">
      <div class="profile-container">
        <i class="fa-solid fa-user option-icon fa-sm"/> Użytkownik niezalogowany
      </div>
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
     iconClass: 'fa-solid fa-house-blank'
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

<style scoped>
.logo-container {
  max-width: 90%;
  max-height: 50px;
}

.profile-container{
  display: flex;
  gap: 6px;
  align-items: center;
}

.logo {
  height: 95%;
  /*border-radius: 50%;*/
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
  width: 90%;
  font-size: 18px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 0 64px rgba(0,0,0,.3);
  background-color: hsla(208deg,46%,12%,.9);
  border-bottom: 2px solid #172b3d;
  border-left: 2px solid #172b3d;
  border-right: 2px solid #172b3d;
}

.navigation-item{
  display: flex;
  gap: 6px;
  align-items: center;
  cursor: pointer;
  padding: 4px 8px;
}
</style>