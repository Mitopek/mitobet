<script setup lang="ts">
import LoadingComponent from "./LoadingComponent.vue";

interface Props {
  isLoading?: boolean
  iconClass?: string
  type?: 'primary' | 'secondary' | 'danger'
}

const props = withDefaults(defineProps<Props>(), {
  iconClass: null,
  type: 'primary',
  isLoading: false,
})

const textStyle = $computed(() => {
  if(props.isLoading) {
    return {
      visibility: 'hidden',
    }
  }
})


</script>

<template>
  <div :class="['button-component', {'is-primary': type === 'primary', 'is-secondary': type === 'secondary'}]">
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
  height: 36px;
  outline: none;
  border: none;
  padding: 3px 12px;
  cursor: pointer;
  font-weight: 500;
  font-size: 16px;
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
      background: map-get(variables.$colors, secondaryDark);
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