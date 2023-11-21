<template>
  <div class="form-item">
    <div class="title">{{props.title}}</div>
    <div class="input">
      <slot/>
    </div>
    <div class="error">
      <span v-if="props.error">{{props.error}}</span>
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
  error: {
    default: '',
    type: String,
  }
})
</script>

<style scoped lang="scss">
.error{
  text-align: center;
  color: #c7c412;
  font-size: 14px; /* przykładowy rozmiar czcionki */
  height: 14px;
}

.form-item{
  width: 100%;
  display: grid;
  gap: 2px
}

</style>