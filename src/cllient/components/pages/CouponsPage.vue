<template>
 <div class="coupons-page">
    <DefaultLayout>
      <div class="main-container">
        <div class="panel">
          <div class="left-panel">
            <div class="subscription-time-wrapper">
              <SubscriptionTime :expiresAt="subscriptionExpiresAt"/>
            </div>
            <div class="options">
              <CouponsOptions/>
            </div>
          </div>
          <div class="content-wrapper">
            <div class="content">
              <CouponCreator v-if="isAdmin" @created="fetchCoupons"/>
              <div v-if="coupons">
                <CouponComponent
                    v-for="coupon in coupons"
                    :startDate="coupon.startDate"
                    :description="coupon.description"
                    :imageUrl="coupon.imageUrl"
                    @delete="onDelete(coupon._id)"
                />
              </div>
            </div>
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
import UniversalCookie from 'universal-cookie'

let isAdmin = $ref(false)
let subscriptionExpiresAt = $ref<Date | null>(null)
let coupons = $ref<ICouponEntity[] | null>(null)

const {getCoupons, deleteCoupon} = $(useCoupons())

onMounted(async () => {
  const cookies = new UniversalCookie()
  isAdmin = cookies.get('is_admin') || false
  subscriptionExpiresAt = new Date(cookies.get('subscription_expires_at' || null))
  await fetchCoupons()
})

const fetchCoupons = async () => {
  coupons = await getCoupons()
}

const onDelete = async (couponId: string) => {
  await deleteCoupon(couponId)
  await fetchCoupons()
}

import DefaultLayout from "../DefaultLayout.vue";
import CouponsOptions from "../CouponsOptions.vue";
import SubscriptionTime from "../SubscriptionTime.vue";
import CouponComponent from "../CouponComponent.vue";
import CouponCreator from "../CouponCreator.vue";
import {ICouponEntity} from "../../../server/models/CouponModel/types/ICouponEntity.js";
</script>

<style scoped>

.content-wrapper{
  width: 100%;
  overflow: auto;
  display: flex;
  justify-content: center;
}

.main-container{
  height: 100vh;
  display: flex;
  justify-content: center;
}

.subscription-time-wrapper{
  padding: 15px 0 0 15px;
}

.content{
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 70%;
}

.options{

}

.left-panel{
  border-radius: 10px 0 0 10px;
  background-color: hsla(208deg,46%,12%,.9);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.panel{
  box-sizing: border-box;
  margin: 60px 0;
  border-radius: 10px;
  background-color: #172b3d;
  grid-template-columns: minmax(0, 20%) minmax(0, 80%);
  display: grid;
  width: 70%;
  min-height: 90vh;
}

</style>