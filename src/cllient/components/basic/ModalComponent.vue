<template>
  <div class="modal-component">
    <slot/>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
  .modal-component{
    background-color: hsla(0deg,0%,10%,.85);
    box-sizing: border-box;
    padding: 20px 60px;
    width: 550px;
    border-radius: 25px;
  }
</style>