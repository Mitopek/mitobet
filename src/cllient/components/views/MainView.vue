<template>
 <div class="main-view">
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
              <RouterView v-slot="{Component}">
                <Component :is="Component"/>
              </RouterView>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
 </div>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {$, $ref} from 'vue/macros'
import UniversalCookie from 'universal-cookie'
import DefaultLayout from "../DefaultLayout.vue";
import CouponsOptions from "../CouponsOptions.vue";
import SubscriptionTime from "../SubscriptionTime.vue";
import {useRouter} from "vue-router";

const router = useRouter()
let subscriptionExpiresAt = $ref<Date | null>(null)

//TODO map responses, _id
onMounted(async () => {
  const cookies = new UniversalCookie()
  if(!cookies.get('mail')) {
    await router.push({path: '/'})
  }
  subscriptionExpiresAt = new Date(cookies.get('subscription_expires_at' || null))
})
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
  border: hsla(208deg,46%,12%,.9) 5px solid;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.panel{
  box-sizing: border-box;
  margin: 1% 0;
  border-radius: 15px;
  border: hsla(208deg,46%,12%,.9) 5px solid;
  background-color: #172b3d;
  grid-template-columns: minmax(0, 20%) minmax(0, 80%);
  display: grid;
  width: 70%;
  min-height: 90vh;
}

</style>