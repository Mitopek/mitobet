<template>
  <input :type="props.type" :value="props.modelValue" @input="emit('update:modelValue', $event.target.value)">
</template>

<script setup lang="ts">
interface IProps {
  type?: string,
  modelValue: unknown,
}
interface IEmits {
  (e: 'update:modelValue', value: unknown): void
}
const props = withDefaults(defineProps<IProps>(),{
  type: 'text',
})
const emit = defineEmits<IEmits>()
</script>

<style scoped>

input{
  border-radius: 10px;
  padding: 0 10px;
  font-size: 16px;
  height: 36px;
  width: 100%;
  outline: none;
  border: none;
  box-sizing: border-box;
}

</style>