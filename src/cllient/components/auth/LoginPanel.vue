<template>
  <div class="login-panel">
    <h2>Zaloguj się</h2>
    <div class="application-buttons">
      <a :href="facebookLink">
        <ButtonComponent iconClass="fa-brands fa-facebook" type="secondary">Facebook</ButtonComponent>
      </a>
      <a :href="googleLink">
        <ButtonComponent iconClass="fa-brands fa-google" type="secondary">Google</ButtonComponent>
      </a>
    </div>
    <div class="separator">
      <div class="line"/>
      lub
      <div class="line"/>
    </div>
    <div class="form">
      <FormItem title="Mail:">
        <InputComponent type="text" v-model="mail" @keydown.enter="onLoginClick" iconClass="fa-solid fa-user"/>
      </FormItem>
      <FormItem title="Hasło:">
        <InputComponent type="password" v-model="password" @keydown.enter="onLoginClick" iconClass="fa-solid fa-lock"/>
      </FormItem>
      <div class="bottom-panel">
        <div class="checkbox-wrapper"><CheckboxComponent :value="true"/> <span class="text">Zapamiętaj mnie</span></div>
        <div class="forget-text-wrapper">
          <span class="register-text" @click="onPasswordForgotClick">Nie pamietasz hasla?</span>
        </div>
      </div>
      <div class="actions-buttons">
        <ButtonComponent @click="onLoginClick" :is-loading="isLoading" class="">
          Zaloguj się
        </ButtonComponent>
        <div class="register-text-wrapper"><span class="text">Nie masz konta?</span>
          <span class="register-text" @click="onRegisterClick">Zarejestruj się</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputComponent from "../basic/InputComponent.vue";
import FormItem from "../FormItem.vue";
import ButtonComponent from "../basic/ButtonComponent.vue";
import {useRoute, useRouter} from "vue-router";
import {$ref, $, $computed} from "vue/macros";
import FacebookButton from "../basic/FacebookButton.vue";
import GoogleButton from "../basic/GoogleButton.vue";
import {useAuth} from "../../composables/useAuth.js";
import {RouterName} from "../../enum/RouterName.js";
import axios from "axios";
import queryString from "query-string";
import {onMounted} from "vue";
import CheckboxComponent from "../basic/CheckboxComponent.vue";
const {login, loginByFacebook, loginByGoogle} = $(useAuth())

const router = useRouter()
const route = useRoute()

const mail = $ref<string>('')
const password = $ref<string>('')
let isLoading = $ref<boolean>(false)
const onRegisterClick = () => {
  router.push({path: '/register'})
}

const onPasswordForgotClick = () => {
  router.push({path: '/forgot-password'})
}

const onLoginClick = async () => {
  isLoading = true
  const response = await login(mail, password)
  if(!response.success && response?.errors) {
    isLoading = false
    return alert(response.errors[0])
  }
  await router.push({name: RouterName.Coupons})
}

const facebookLink = $computed( () => {
  const query = queryString.stringify({
    client_id: import.meta.env.VITE_FACEBOOK_APP_ID,
    redirect_uri: import.meta.env.VITE_FACEBOOK_REDIRECT_URL,
    response_type: 'code',
    scope: 'email,public_profile',
  })
  return `https://www.facebook.com/v18.0/dialog/oauth?${query}`;
})

const googleLink = $computed(() => {
  const query = queryString.stringify({
    redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URL,
    client_id: import.meta.env.VITE_GOOGLE_APP_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
    state: '/',
  })
  return `https://accounts.google.com/o/oauth2/v2/auth?${query}`;
})

// export const getGoogleUrl = (from) => {
//   const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;
//
//   const options = {
//     redirect_uri: import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT,
//     client_id: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID,
//     access_type: 'offline',
//     response_type: 'code',
//     prompt: 'consent',
//     scope: [
//       'https://www.googleapis.com/auth/userinfo.profile',
//       'https://www.googleapis.com/auth/userinfo.email',
//     ].join(' '),
//     state: from,
//   };
//
//   const qs = new URLSearchParams(options);
//
//   return `${rootUrl}?${qs.toString()}`;
// };


onMounted(async () => {
  const code = route.query.code
  const state = route.query.state
  if(code && state) {
    isLoading = true
    const response = await loginByGoogle(code as string)
    if(!response.success && response?.errors) {
      return alert(response.errors[0])
    }
    await router.push({name: RouterName.Coupons})
  }
  else if(code) {
    isLoading = true
    const response = await loginByFacebook(code as string)
    if(!response.success && response?.errors) {
      return alert(response.errors[0])
    }
    await router.push({name: RouterName.Coupons})
  }
})

</script>

<style scoped lang="scss">
@use '../../variables.scss' as variables;

.separator{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 20px 0;
  font-size: 14px;
  font-weight: 500;
  color: #a0a0a0;
}

.checkbox-wrapper{
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
}

.text{
  white-space: nowrap;
}

.bottom-panel{
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: 100%;
  font-size: 13px;
}

.register-text-wrapper{
  gap: 4px;
  display: flex;
  justify-content: center;
}

.forget-text-wrapper{
  gap: 4px;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.register-text{
  color: map-get(variables.$colors, primary);
  text-decoration: underline;
  cursor: pointer;
}

.line{
  width: 100%;
  height: 1px;
  background-color: #a0a0a0;
}


  h2 {
    text-align: center;
  }
  .login-panel{
    display: flex;
    flex-direction: column;
    gap: 2px;
    width: 100%;
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }

  .actions-buttons{
    width: 90%;
    padding: 8px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    box-sizing: border-box;
    font-size: 13px;
  }

  .application-buttons{
    display: flex;
    justify-content: center;
    padding-top: 8px;
    //flex-direction: column;
    gap: 8px;
    width: 100%;
  }

@media (max-width: 400px) {
  .actions-buttons{
    width: 100%;
    align-items: unset;
  }
}
</style>