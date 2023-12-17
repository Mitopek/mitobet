<script setup lang="ts">
interface Props {
  value: number
  isEditable?: boolean
}

interface Emits {
  (e: 'change', value: number): void
}

const props = withDefaults(defineProps<Props>(), {
  isEditable: false,
})
const emit = defineEmits<Emits>()

</script>

<template>
  <div class="risk-component">
    <i :class="['fas fa-fire', 'icon', {'is-filled': i <= value}]" v-for="i in 3" :key="i" @click="emit('change', i)"/>
  </div>
</template>

<style scoped lang="scss">
.risk-component{
  display: flex;
  width: min-content;
  justify-content: center;
  align-items: center;
  i{
    color: #545454;
    //font-size: 1.5rem;
  }
  gap: 5px;
}

.icon{
  font-size: 1.2rem;
  &.is-filled{
    color: #FFC107;
  }
}
</style>