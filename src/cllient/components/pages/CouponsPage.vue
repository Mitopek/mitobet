<template>
 <div class="coupons-page">
    <CouponCreator v-if="isAdmin" @created="fetchCoupons"/>
    <div v-if="coupons" class="coupons-container">
      <div class="coupon-wrapper" v-for="coupon in coupons">
        <CouponComponent
          :startDate="coupon.startDate"
          :description="coupon.description"
          :imageUrl="coupon.imageUrl"
          :canDelete="isAdmin"
          @delete="onDelete(coupon._id)"
        />
      </div>
    </div>
    <div v-else-if="isSubscriptionActive" class="text-wrapper">
      Brak kuponów.
    </div>
    <div v-else class="text-wrapper">
      Wymagana aktywna subskrypcja.
    </div>
 </div>
</template>

<script setup lang="ts">
import {useCoupons} from "../../composables/useCoupons.js";
import {onMounted} from "vue";
import {$, $ref} from 'vue/macros'
import UniversalCookie from 'universal-cookie'
import CouponComponent from "../CouponComponent.vue";
import CouponCreator from "../CouponCreator.vue";
import {ICouponEntity} from "../../../server/models/CouponModel/types/ICouponEntity.js";
import {useRouter} from "vue-router";
import {RouterName} from "../../enum/RouterName.js";
import {$computed} from "vue/macros.js";

const router = useRouter()
let isAdmin = $ref(false)
let subscriptionExpiresAt = $ref<Date | null>(null)
let coupons = $ref<ICouponEntity[] | null>(null)

const {getCoupons, deleteCoupon} = $(useCoupons())
//TODO map responses, _id  , check validation of all html page
onMounted(async () => {
  const cookies = new UniversalCookie()
  if(!cookies.get('mail')) {
    await router.push({name: RouterName.Home})
  }
  isAdmin = cookies.get('is_admin') === 'true' || false
  subscriptionExpiresAt = new Date(cookies.get('subscription_expires_at' || null))
  await fetchCoupons()
})

const isSubscriptionActive = $computed(() => {
  return !!subscriptionExpiresAt  && subscriptionExpiresAt > new Date()
})

const fetchCoupons = async () => {
  coupons = await getCoupons()
}

const onDelete = async (couponId: string) => {
  await deleteCoupon(couponId)
  await fetchCoupons()
}
</script>

<style scoped>
.coupons-container{
  max-width: 490px;
}

.coupon-wrapper{
  margin: 15px 0;
}

.text-wrapper{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.warning {
  color: #d34747;
}

</style>