<template>
  <div class="default-layout">
    <div class="navigation-bar-wrapper bigger" v-if="props.showNavigationBar">
      <NavigationBar/>
    </div>
    <div class="navigation-bar-wrapper smaller" v-if="props.showNavigationBar">
      <SmallerNavigationBar/>
    </div>
    <slot/>
  </div>
</template>

<script setup lang="ts">
import NavigationBar from "./NavigationBar.vue";
import SmallerNavigationBar from "./SmallerNavigationBar.vue";

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

.smaller{
  display: none;
}

.default-layout{
  width: 100%;
  height: 100vh;
}

@media (max-width: 1100px) {
  .bigger{
    display: none;
  }
  .smaller{
    display: flex;
  }
}

</style>