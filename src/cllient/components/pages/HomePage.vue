<template>
 <div class="main-page">
    <DefaultLayout showNavigationBar>
      <div class="main-items-container">
        <div class="login-panel-wrapper">
          <ModalComponent>
            <LoginPanel/>
          </ModalComponent>
        </div>
        <div class="arrow-wrapper">
          <AnimatedArrowButton/>
        </div>
      </div>
      <div class="content-wrapper">
        <div class="content">
          <MainTextContent/>
          <PricesContent/>
        </div>
      </div>
    </DefaultLayout>
 </div>
</template>

<script setup lang="ts">

import DefaultLayout from "../DefaultLayout.vue";
import LoginPanel from "../auth/LoginPanel.vue";
import AnimatedArrowButton from "../AnimatedArrowButton.vue";
import PricesContent from "../SubscriptionsContent.vue";
import ModalComponent from "../basic/ModalComponent.vue";
import MainTextContent from "../MainTextContent.vue";
import {onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useAuth} from "../../composables/useAuth";
import {$ref, $} from "vue/macros";
import {RouterName} from "../../enum/RouterName";
const route = useRoute()
const router = useRouter()
const {loginByFacebook} = $(useAuth())

onMounted(async () => {
  const code = route.query.code
  console.info(code)
  if(code) {
    const response = await loginByFacebook(code as string)
    if(!response.success && response?.errors) {
      return alert(response.errors[0])
    }
    await router.push({name: RouterName.Coupons})
  }
})
</script>

<style scoped>

.content-wrapper{
  background: #0000009e;
}

.content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 17%;
  padding: 40px 0;
}

.main-items-container{
  height: 75%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login-panel-wrapper{
  margin-top: 200px;
}

.arrow-wrapper {
  margin: 0 0 30px 0;
}

.main-page {
  width: 100%;
}
</style>