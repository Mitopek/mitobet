<template>
  <div class="coupon-component">
    <span>Rozpoczęcie: <span class="start-date">{{props.startDate}}</span></span>
    <div class="image-wrapper">
      <img :src="props.imageUrl" alt="" class="img"/>
    </div>
    <div class="text-container">
      <span class="description" v-if="description">{{props.description}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">

interface Props {
  imageUrl: string
  startDate: Date
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  description: '',
})

</script>

<style scoped>
.image-wrapper{
  width: 300px;
}

.start-date{
  font-weight: 600;
  letter-spacing: 1px;
}

.img{
  border: 1px solid black;
}

.description{
  font-size: 14px;
}

</style>