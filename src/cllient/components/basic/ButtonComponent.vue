<template>
  <div class="button-component">
    <button>
      <slot/>
    </button>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">

//@keyframes colorChange {
//  0% {
//    background-color: #202020;
//    color: white;
//  }
//  100% {
//    background-color: white;
//    color: #202020;
//  }
//}


button{
  height: 36px;
  border-radius: 4px;
  background-color: #0b5daf;
  color: #f9f9f9;
  outline: none;
  border: none;
  padding: 3px 12px;
  cursor: pointer;
  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: #1a8dff;
  }
}

</style>