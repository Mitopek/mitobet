<template>
  <div class="form-item">
    <div class="title">{{props.title}}</div>
    <div class="input">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputComponent from "./basic/InputComponent.vue";

const props = defineProps({
  title: {
    default: '',
    type: String,
  },
  value: {
    default: '',
    type: String,
  }
})
</script>

<style scoped>
.form-item{
  width: 100%;
  display: grid;
}

.title{
  padding: 3px;
}
</style>