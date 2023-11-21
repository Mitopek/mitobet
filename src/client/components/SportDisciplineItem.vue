<template>
  <div class="sport-discipline-item">
    <div :class="['icon-wrapper', {'is-chosen': props.isChosen}]">
      <i :class="`${props.iconClass} fa-xl`"/>
    </div>
    <div class="title">
      {{props.title}}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  iconClass: string,
  title: string,
  isChosen?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  isChosen: false
})

</script>

<style scoped lang="scss">
.icon-wrapper{
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 48px;
  background-color: #3c589f;
  box-sizing: border-box;
  &:hover {
    border: 1px solid white;
  }
  &.is-chosen {
    color: #13beff;
    border: 2px solid #13beff;
  }

}

.sport-discipline-item{
  display: flex;
  font-size: 14px;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  box-sizing: border-box;
}

.title{
  &:hover {
    text-shadow: 0 0 2px white;
  }
}
</style>