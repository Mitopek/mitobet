<template>
  <div class="country-item">
    <div class="flag-wrapper">
      <img :src="props.flag" alt="" class="flag"/>
    </div>
    <div class="country-name">
      {{props.name}}
    </div>
  </div>
</template>

<script setup lang="ts">

interface Props {
  name: string,
  flag: string,
}

const props = defineProps<Props>()

</script>

<style scoped>

.country-item{
  display: flex;
  align-items: center;
  gap: 10px;
}

.flag-wrapper {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.flag{
  width: 130%;
  height: 130%;
  border-radius: 50%;
}
</style>