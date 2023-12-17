<script setup lang="ts">
import {$computed} from "vue/macros";

interface IProps {
  type?: string,
  modelValue?: string,
  iconClass?: string,
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
  iconClass: null,
})
const emit = defineEmits<IEmits>()

const inputAdditionalStyle = $computed(() => {
  if(props.iconClass) {
    return {
      paddingLeft: '8px',
    }
  }
})
</script>

<template>
  <div class="input-component">
    <i :class="props.iconClass" v-if="props.iconClass"/>
    <input
        :type="props.type"
        :value="props.modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        @change="emit('change', $event.target.value)"
        :placeholder="props.placeholder"
        :style="inputAdditionalStyle"
    />
  </div>
</template>


<style scoped lang="scss">
@use '../../variables.scss' as variables;

.input-component{
  background: map-get(variables.$colors, surfaceHigh);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 36px;
  color: white;
  padding: 12px;
  box-sizing: border-box;
  width: 100%;
}

input{
  padding: 0 10px;
  font-size: 16px;
  height: 36px;
  width: 100%;
  outline: none;
  border: none;
  box-sizing: border-box;
  background: map-get(variables.$colors, surfaceHigh);
  color: white;
}
input[type="datetime-local"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
</style>