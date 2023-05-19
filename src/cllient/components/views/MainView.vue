<template>
 <div class="main-view">
    <DefaultLayout>
      <div class="main-container">
        <div class="panel">
          <div class="left-panel">
            <div class="info-wrapper">
              {{userMail}}
              <SubscriptionTime :expiresAt="subscriptionExpiresAt"/>
            </div>
            <div class="options">
              <PanelOptions @logout="onLogout"/>
            </div>
          </div>
          <div class="content-wrapper">
            <RouterView v-slot="{Component}">
              <Component :is="Component"/>
            </RouterView>
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
import SubscriptionTime from "../SubscriptionTime.vue";
import {useRouter} from "vue-router";
import {useAuth} from "../../composables/useAuth.js";
import PanelOptions from "../PanelOptions.vue";

const router = useRouter()
let userMail = $ref(null)
const {logout} = $(useAuth())
let subscriptionExpiresAt = $ref<Date | null>(null)

//TODO map responses, _id
onMounted(async () => {
  const cookies = new UniversalCookie()
  userMail = cookies.get('mail')
  if(!userMail) {
    await router.push({path: '/'})
  }
  subscriptionExpiresAt = new Date(cookies.get('subscription_expires_at' || null))
})

const onLogout = async () => {
  await logout()
  const cookies = new UniversalCookie()
  if(!cookies.get('mail')) {
    await router.push({path: '/'})
  }
}
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

.info-wrapper{
  padding: 15px 0 0 15px;
  display: flex;
  flex-flow: column;
  gap: 5px;
}

.options{

}

.left-panel{
  border-radius: 10px 0 0 10px;
  background-color: #0000009e;
  border-left: #040404e6 5px solid;
  border-right: #040404e6 5px solid;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
}

.panel {
  box-sizing: border-box;
  margin: 1% 0;
  border-radius: 15px;
  border: 5px solid #040404e6;
  background-color: #0000009e;
  display: grid;
  grid-template-columns: minmax(0, 23%) minmax(0, 77%);
  width: 70%;
  min-height: 90vh;
}

@media screen and (max-width: 800px) {
  .panel {
    margin: 0;
    width: 100%;
  }
}

@media screen and (max-width: 600px) {
  .left-panel {
    display: none;
  }
  .panel {
    grid-template-columns: auto;
  }
}


</style>