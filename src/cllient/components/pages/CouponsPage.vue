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
          <div class="content">
            <CouponComponent startDate="2023-05-03 18:00" description="No tak mysle ze to tak ale moze jednak nie" imageUrl="https://scontent-waw1-1.xx.fbcdn.net/v/t39.30808-6/346089297_3371475173126792_8081334352204991755_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=730e14&_nc_ohc=h1l6eeprQbcAX9UQxF9&_nc_ht=scontent-waw1-1.xx&oh=00_AfCpQ2_orBm3bT6GZdJu3nz-Bi2pu3JgQ4jUjyzSl9y9jg&oe=64667737"/>
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
import CouponComponent from "../CouponComponent.vue";
</script>

<style scoped>
.main-container{
  margin-top: 40px;
  padding: 30px;
  display: flex;
  justify-content: center;
}

.subscription-time-wrapper{
  padding: 15px 0 0 15px;
}

.content{
  padding: 30px;
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
  background-color: hsla(0deg,0%,11%,.90);
  grid-template-columns: 250px 1fr;
  display: grid;
  width: 70%;
  min-height: 90vh;
}

</style>