<template>
 <div class="main-view">
    <DefaultLayout>
      <div class="small-navigation-bar-wrapper">
        <SmallNavigationPanelBar/>
      </div>
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
            <div class="background-image">
              <div class="background"/>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
   <div class="modal-container" v-if="showConsentsModal">
     <ModalComponent>
       <ConsentsPanel @accept="onConsentsAccept"/>
     </ModalComponent>
     <div class="overlay"/>
   </div>
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
import ModalComponent from "../basic/ModalComponent.vue";
import ConsentsPanel from "../ConsentsPanel.vue";
import SmallerNavigationBar from "../SmallerNavigationBar.vue";
import SmallNavigationPanelBar from "../SmallNavigationPanelBar.vue";

const router = useRouter()
let userMail = $ref(null)
const {logout, acceptConsents} = $(useAuth())
let subscriptionExpiresAt = $ref<Date | null>(null)
let showConsentsModal = $ref(false)
//TODO map responses, _id
onMounted(async () => {
  const cookies = new UniversalCookie()
  userMail = cookies.get('mail')
  if(!userMail) {
    await router.push({path: '/'})
  }
  subscriptionExpiresAt = new Date(cookies.get('subscription_expires_at' || null))
  showConsentsModal = cookies.get('has_accepted_consents') === 'false'
})

const onLogout = async () => {
  await logout()
  const cookies = new UniversalCookie()
  if(!cookies.get('mail')) {
    await router.push({path: '/'})
  }
}

const onConsentsAccept = async () => {
  const cookies = new UniversalCookie()
  cookies.set('has_accepted_consents', true)
  showConsentsModal = false
  await acceptConsents(true, true)
}
</script>

<style scoped lang="scss">
@use '../../variables.scss' as variables;

.content-wrapper{
  width: 100%;
  overflow: auto;
  display: flex;
  padding: 40px;
  box-sizing: border-box;
  justify-content: center;
  position: relative;
  background: rgb(43 43 43 / 90%);
}

.background-image{
  background-image: url('/phoneblack.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}
//
//.background{
//  background: map-get(variables.$colors, surfaceLow);
//  opacity: 0.95;
//  width: 100%;
//  height: 100%;
//}

.main-container{
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}

.modal-container{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999;
}

.overlay{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(5px);
  background: black;
  opacity: 0.3;
  z-index: -1;
}

.info-wrapper{
  padding-left: 28px;
  height: 100px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  gap: 5px;
  background: map-get(variables.$colors, surfaceMediumHigh);
}

.small-navigation-bar-wrapper{
  position: fixed;
  justify-content: center;
  width: 100vw;
  height: 60px;
  z-index: 100;
  top: 0;
  display: none;
}

.options{
  padding: 20px;
}

.left-panel{
  background-color: map-get(variables.$colors, surface);
  /*border-right: #040404e6 2px solid;*/
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
}

.panel {
  box-sizing: border-box;
  border: 1px solid map-get(variables.$colors, surface);
  background-color: #0000009e;
  display: grid;
  grid-template-columns: 300px 1fr;
  width: 100%;
}

@media (max-width: 850px) {
  .left-panel {
    display: none;
  }
  .small-navigation-bar-wrapper{
    display: flex;
  }
  .panel {
    grid-template-columns: auto;
  }
  .content-wrapper{
    padding: 120px 12px 40px 12px;
  }
}


</style>