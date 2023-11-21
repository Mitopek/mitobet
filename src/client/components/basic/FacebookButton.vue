<template>
  <div class="facebook-button">
    <div class="icon">
      <i class="fa-brands fa-facebook"></i>
    </div>
    <div class="title">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.facebook-button{
  justify-content: center;
  border-radius: 5px;
  align-items: center;
  background-color: #3c589f;
  padding: 8px;
  display: flex;
  gap: 6px;
  box-sizing: border-box;
  cursor: pointer;
}

.icon{
  font-size: 18px;
}
</style>