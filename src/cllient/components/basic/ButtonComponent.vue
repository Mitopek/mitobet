<template>
  <div class="button-component">
    <button>
      <slot/>
    </button>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>

button{
  height: 36px;
  border-radius: 10px;
  background-color: #747bff;
  color: #f9f9f9;
  outline: none;
  border: none;
  padding: 3px 12px;
  cursor: pointer;
}

</style>