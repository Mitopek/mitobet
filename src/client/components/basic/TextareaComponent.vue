<template>
  <textarea :value="props.modelValue" @input="emit('update:modelValue', $event.target.value)" :rows="props.rows"/>
</template>

<script setup lang="ts">
interface IProps {
  modelValue: unknown,
  rows?: number
}
interface IEmits {
  (e: 'update:modelValue', value: unknown): void
}
const props = withDefaults(defineProps<IProps>(), {
  rows: 5
})
const emit = defineEmits<IEmits>()
</script>

<style scoped lang="scss">
@use '../../variables.scss' as variables;

textarea{
  padding: 10px;
  font-size: 16px;
  width: 100%;
  outline: none;
  border: none;
  box-sizing: border-box;
  resize: none;
  background: map-get(variables.$colors, surfaceHigh);
  color: white;
}

</style>