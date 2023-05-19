<template>
  <div class="default-layout">
    <div class="navigation-bar-wrapper" v-if="props.showNavigationBar">
      <NavigationBar/>
    </div>
    <slot/>
  </div>
</template>

<script setup lang="ts">
import NavigationBar from "./NavigationBar.vue";

interface Props {
  showNavigationBar?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showNavigationBar: false
})
</script>

<style scoped>
.navigation-bar-wrapper{
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 60px;
  z-index: 100;
  top: 0;

}

.default-layout{
  width: 100%;
  height: 100vh;
}

</style>