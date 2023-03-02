<template>
  <input :type="props.type" :value="props.modelValue" @change="emit('update:modelValue', $event.target.value)">
</template>

<script setup lang="ts">
interface IProps {
  type: string,
  modelValue: unknown,

}
interface IEmits {
  (e: 'update:modelValue', value: unknown): void
}
const props = defineProps<IProps>()
const emit = defineEmits<IEmits>()
</script>

<style scoped>

input{
  border-radius: 15px;
  padding: 5px;
  height: 30px;
  width: 100%;
  outline: none;
}

</style>