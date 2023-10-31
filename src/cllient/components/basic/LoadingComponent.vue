<script setup>
import {defineProps} from 'vue'

const props = defineProps({
  color: {
    type: String,
    required: false,
    default() {
      return 'theme'
    },
  },
})
</script>

<template>
  <div :class="['loading', `color-${color}`]"/>
</template>

<style scoped lang="scss">

@keyframes rotate-infinite {
  0% {
    transform: rotate(0)
  }
  100% {
    transform: rotate(360deg)
  }
}

.loading {
  width: 16px;
  height: 16px;
  border: 3px solid transparent;
  border-top: 3px solid white;
  border-radius: 100px;
  animation: rotate-infinite .5s linear infinite;

  &.color-theme {
    border-top-color: black;
  }
}
</style>
