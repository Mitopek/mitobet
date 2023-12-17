<template>
  <div class="subscription-time">
<!--    <i class="fa-regular fa-clock"></i>-->
    <span v-if="!isActive" class="text-no-subscription"> Brak subskrypcji</span>
    <span v-else> Czas subskrypcji:<br/><span  class="text-subscription">{{expiresTime}}</span></span>
  </div>
</template>

<script setup lang="ts">
//TODO fontawesome icons?? wtf
import {$computed} from "vue/macros";

interface Props {
  expiresAt: Date
}

const props = defineProps<Props>()

const isActive = $computed(() => {
  return !!props.expiresAt  && props.expiresAt > new Date()
})

const expiresTime = $computed(() => {
  if(!isActive) {
    return null
  }
  const diff = props.expiresAt.getTime() - Date.now();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
  // const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  // const minutes = Math.floor((diff / (1000 * 60)) % 60);

  return`${days} dni.`;
})

</script>

<style scoped>
.subscription-time{
  font-size: 14px;
}

.text-subscription{
  color: #038f03;
}

.text-no-subscription{
  opacity: 0.4;
}
</style>