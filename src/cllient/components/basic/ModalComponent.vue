<template>
  <div class="modal-component">
    <slot/>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
@use '../../variables.scss' as variables;
  .modal-component{
    background: map-get(variables.$colors, surfaceLow);
    box-sizing: border-box;
    padding: 20px 60px;
    width: 550px;
  }
</style>