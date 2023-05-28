<template>
  <input
    :type="props.type"
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
    @change="emit('change', $event.target.value)"
    :placeholder="props.placeholder"
  />
</template>

<script setup lang="ts">
interface IProps {
  type?: string,
  modelValue?: string,
  placeholder?: '',
}
interface IEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}
const props = withDefaults(defineProps<IProps>(),{
  type: 'text',
  placeholder: '',
  modelValue: '',
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