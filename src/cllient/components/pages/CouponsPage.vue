<template>
 <div class="coupons-page">
    <DefaultLayout>
      <div class="main-container">
        <div class="panel">
          <div class="left-panel">
            <div class="subscription-time-wrapper">
              <SubscriptionTime :expiresAt="test"/>
            </div>
            <div class="options">
              <CouponsOptions/>
            </div>
          </div>
          <div>
            ss
          </div>
        </div>
      </div>
    </DefaultLayout>
 </div>
</template>

<script setup lang="ts">
import {useCoupons} from "../../composables/useCoupons.js";
import {onMounted} from "vue";
import {$, $ref} from 'vue/macros'

const test = $ref(new Date('2022-06-30T23:59:59'))

const {getCoupons} = $(useCoupons())

onMounted(() => {
  getCoupons()
})

import DefaultLayout from "../DefaultLayout.vue";
import CouponsOptions from "../CouponsOptions.vue";
import SubscriptionTime from "../SubscriptionTime.vue";
</script>

<style scoped>
.main-container{
  margin-top: 50px;
  padding: 30px;
  display: flex;
  justify-content: center;
}

.subscription-time-wrapper{
  padding: 15px 0 0 15px;
}

.options{

}

.left-panel{
  border-radius: 10px 0 0 10px;
  background-color: hsla(0deg,0%,10%,.85);
  display: flex;
  flex-direction: column;
}

.panel{
  border-radius: 10px;
  background-color: hsla(0deg,0%,10%,.85);
  grid-template-columns: 250px 1fr;
  display: grid;
  width: 70%;
  min-height: 80vh;
}

</style>