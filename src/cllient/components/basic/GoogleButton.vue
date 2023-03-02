<template>
  <div class="google-button">
    <div class="icon">
      <i class="fa-brands fa-google"></i>
    </div>
    <div class="title">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.google-button{
  justify-content: center;
  border-radius: 5px;
  background-color: #EA4335;
  padding: 8px;
  display: flex;
  gap: 6px;
}
</style>