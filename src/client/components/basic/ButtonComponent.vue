<script setup lang="ts">
import LoadingComponent from "./LoadingComponent.vue";
import {$computed} from "vue/macros";

interface Props {
  isLoading?: boolean
  iconClass?: string
  isDisabled?: boolean
  type?: 'primary' | 'secondary' | 'danger'
}

interface Emits {
  (e: 'click'): void
}

const emit = defineEmits<Emits>()

const props = withDefaults(defineProps<Props>(), {
  iconClass: null,
  type: 'primary',
  isLoading: false,
  isDisabled: false,
})

const textStyle = $computed(() => {
  if(props.isLoading) {
    return {
      visibility: 'hidden',
    }
  }
})

const onClick = () => {
  if(props.isDisabled) {
    return
  }
  emit('click')
}

</script>

<template>
  <div :class="['button-component', {'is-primary': type === 'primary', 'is-secondary': type === 'secondary', 'is-disabled': props.isDisabled}]" @click="onClick">
    <i v-if="props.iconClass" :class="props.iconClass"/>
    <div class="loading-wrapper" v-if="props.isLoading">
      <LoadingComponent/>
    </div>
    <div :style="textStyle">
      <slot/>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../variables.scss' as variables;

.button-component{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: 4px;
  height: 36px;
  outline: none;
  border: none;
  padding: 3px 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 15px;
  position: relative;

  &.is-primary{
    background-color: map-get(variables.$colors, primary);
    color: #272727;
    &:hover{
      transition: all 0.2s ease-in-out;
      background: map-get(variables.$colors, primaryDark);
    }
  }
  &.is-secondary{
    background: map-get(variables.$colors, secondary);
    color: #f9f9f9;
    &:hover {
      transition: all 0.2s ease-in-out;
      background: map-get(variables.$colors, secondaryLight);
    }
  }
  &.is-disabled{
    background: #ccc;
    color: #f9f9f9;
    cursor: default;
    opacity: 0.6;
    &:hover {
      background: #ccc;
    }
  }
}

.loading-wrapper{
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}

//#3aab15 - paleta kolorow

</style>