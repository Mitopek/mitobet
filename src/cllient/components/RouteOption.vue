<template>
  <div>
    <RouterLink :to="props.to">
      <div class="route-option">
          <div class="icon-wrapper"><i :class="props.iconClass"/></div> {{props.title}}
      </div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
interface Props {
  iconClass: string
  to: string
  title: string
  isCurrent?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isCurrent: false,
})

</script>

<style scoped lang="scss">
.route-option{
  padding: 2px 10px;
  cursor: pointer;
  display: grid;
  color: #f9f9f9;
  font-weight: 400;
  grid-template-columns: 30px 1fr;
  align-items: center;
  transition: background-color .3s ease;
  &:hover {
     font-weight: 500;
     background-color: hsla(208deg,46%,15%,.9);
   }
}

.icon-wrapper{
  display: flex;
  justify-content: center;
}
</style>