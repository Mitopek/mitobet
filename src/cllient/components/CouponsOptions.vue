<template>
  <div class="coupons-options">
    <div class="option"><i class="fa-solid fa-memo option-icon"/> Najbliższe kupony</div>
    <div class="option"><i class="fa-solid fa-bell option-icon"/> Powiadomienia</div>
    <div class="separator"/>
    <div class="option"><i class="fa-solid fa-user option-icon"/> Konto</div>
    <div class="option"><i class="fa-solid fa-crown option-icon"></i> Subskrypcja</div>
    <div class="separator"/>
    <div class="option"><i class="fa-solid fa-arrow-up-left-from-circle option-icon"></i> Wyloguj</div>
  </div>
</template>

<script setup lang="ts">
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

.option{
  padding: 1px 10px;
  cursor: pointer;
  display: grid;
  grid-template-columns: 30px 1fr;
  align-items: center;
  transition: background-color .3s ease;
  &:hover {
    font-weight: 500;
    background-color: hsla(208deg,46%,15%,.9);
  }
}

.separator{
  margin: 3px 0;
  border-bottom: 1px solid #2b2b2be9;
}
</style>