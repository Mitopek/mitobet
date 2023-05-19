<template>
  <div class="coupons-options">
    <RouteOption to="/me" icon-class="fa-solid fa-memo" title="Najbliższe kupony"/>
    <RouteOption to="/me/notifications" icon-class="fa-solid fa-bell" title="Powiadomienia"/>
    <div class="separator"/>
    <RouteOption to="/me" icon-class="fa-solid fa-user" title="Konto"/>
    <RouteOption to="/me" icon-class="fa-solid fa-crown" title="Subskrypcja"/>
    <div class="separator"/>
    <div class="logout" @click="emit('logout')"><div class="icon-wrapper"><i class="fa-solid fa-arrow-up-left-from-circle"/></div> Wyloguj</div>
  </div>
</template>

<script setup lang="ts">
import RouteOption from "./RouteOption.vue";

interface Emits {
  (e: 'logout'): void
}

const emit = defineEmits<Emits>()
</script>

<style scoped lang="scss">
.coupons-options{
  box-sizing: border-box;
  padding: 10px 5px;
  width: 100%;
}
.option-icon{
  justify-self: center;
}

.logout{
  padding: 2px 10px;
  cursor: pointer;
  display: grid;
  grid-template-columns: 30px 1fr;
  align-items: center;
  transition: background-color .3s ease;
  justify-content: center;
  &:hover {
    font-weight: 500;
    background-color: hsla(208deg,46%,15%,.9);
  }
}

.separator{
  margin: 3px 0;
  border-bottom: 1px solid #2b2b2be9;
}

.icon-wrapper{
  min-width: 30px;
  display: flex;
  justify-content: center;
}
</style>