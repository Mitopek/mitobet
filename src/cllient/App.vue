<script setup lang="ts">
</script>

<template>
  <div class="page">
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
.page {

}

/*.background-image{*/
/*  z-index: -1;*/
/*  position: fixed;*/
/*  background-attachment: fixed;*/
/*  height: 100%;*/
/*  width: 100%;*/
/*  background-image: url('background.jpg');*/
/*  background-repeat: round;*/
/*}*/

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
