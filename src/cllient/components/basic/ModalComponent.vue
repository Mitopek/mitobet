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
    max-width: 550px;
    width: 100%;
    min-width: 0;
  }

@media (max-width:800px) {
  .modal-component{
    padding: 20px 20px;
  }
}
</style>