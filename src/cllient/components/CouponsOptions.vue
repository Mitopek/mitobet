<template>
  <div class="coupons-options">
    <div class="option">Kupony</div>
    <div class="option">Powiadomienia</div>
    <div class="separator"/>
    <div class="option">Konto</div>
    <div class="option">Subskrypcja</div>
    <div class="separator"/>
    <div class="option">Wyloguj</div>
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
.option{
  padding: 1px 10px;
  cursor: pointer;
  &:hover {
    background-color: hsla(0deg,0%,15%,.85);
  }
}

.separator{
  margin: 3px 0;
  border-bottom: 1px solid #2b2b2be9;
}
</style>