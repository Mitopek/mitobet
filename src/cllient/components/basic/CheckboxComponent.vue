<script setup lang="ts">
interface Props {
  value: boolean,
}

const props = defineProps<Props>()

</script>

<template>
  <div class="checkbox-component">
    <i class="fa-solid fa-check" v-if="props.value"/>
  </div>
</template>

<style scoped lang="scss">
@use '../../variables.scss' as variables;
.checkbox-component{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: map-get(variables.$colors, surfaceHigh);
  color: map-get(variables.$colors, primary);
  cursor: pointer;
}
</style>