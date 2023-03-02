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
   0%, 30% {
     top: 0;
   }
   20% {
     top: 20px;
   }
 }

 .animated-arrow-button{
   cursor: pointer;
 }

 .icon-wrapper{
   position: relative;
   animation-name: move;
   animation-duration: 3s;
   animation-iteration-count: infinite;
   font-size: 28px;
 }
</style>