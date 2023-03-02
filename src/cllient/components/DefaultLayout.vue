<template>
  <div class="default-layout">
    <div class="navigation-bar">
      <NavigationBar/>
    </div>
    <slot/>
  </div>
</template>

<script>
import NavigationBar from "./NavigationBar.vue";

export default {
  name: "DefaultLayout",
  components: {NavigationBar}
}
</script>

<style scoped>
.navigation-bar{
  position: sticky;
  z-index: 100;
  top: 0;
}

.default-layout{
  width: 100%;
  height: 100%;
}

</style>