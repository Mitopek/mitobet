<template>
  <div class="animated-arrow-button">
    <div class="icon-wrapper">
      <i class="fa-solid fa-chevron-down"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
 @keyframes move{
   0%, 60% {
     top: 0;
   }
   20% {
     top: 32px;
   }
 }

 .icon-wrapper{
   position: relative;
   animation-name: move;
   animation-duration: 2000ms;
   animation-iteration-count: infinite;
   font-size: 80px;
 }
</style>