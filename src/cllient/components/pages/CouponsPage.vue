<template>
 <div class="coupons-page">
    <DefaultLayout>
      ...
    </DefaultLayout>
 </div>
</template>

<script setup lang="ts">
import {useCoupons} from "../../composables/useCoupons.js";
import {onMounted} from "vue";
import {$} from 'vue/macros'

const {getCoupons} = $(useCoupons())

onMounted(() => {
  getCoupons()
})

import DefaultLayout from "../DefaultLayout.vue";
</script>

<style scoped>
</style>