<template>
  <div>
    <RouterLink :to="{name: props.to}">
      <div :class="['route-option',{'is-current':isCurrentRoute}]" :style="additionalStyle">
          <div class="icon-wrapper"><i :class="props.iconClass"/></div> {{props.title}}
      </div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import {RouterName} from "../enum/RouterName.js";
import {$computed} from "vue/macros";
import {useRoute} from 'vue-router'

interface Props {
  iconClass: string
  to: RouterName
  title: string
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: '#f9f9f9'
})
const router = useRoute()

const isCurrentRoute = $computed(() => {
  return router.name === props.to
})

const additionalStyle = $computed(() => {
  return {
    color: props.color
  }
})

</script>

<style scoped lang="scss">

.route-option{
  padding: 4px 10px;
  cursor: pointer;
  display: grid;
  font-weight: 400;
  grid-template-columns: 30px 1fr;
  align-items: center;
  transition: background-color .3s ease;
  &.is-current {
    background-color: hsla(0, 0%, 20%, 0.5);
  }
  &:hover {
     font-weight: 500;
     background-color: hsla(0, 0%, 14%, 0.5);
  }
}

.icon-wrapper{
  display: flex;
  justify-content: center;
}
</style>