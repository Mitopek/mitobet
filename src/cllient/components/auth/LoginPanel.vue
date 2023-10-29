<template>
  <div class="login-panel">
    <h2>Zaloguj się</h2>
    <div class="form">
      <FormItem title="Mail:">
        <InputComponent type="text" v-model="mail" @keydown.enter="onLoginClick"/>
      </FormItem>
      <FormItem title="Hasło:">
        <InputComponent type="password" v-model="password" @keydown.enter="onLoginClick"/>
      </FormItem>
      <div class="actions-buttons">
        <ButtonComponent @click="onRegisterClick">
          Nie masz konta?
        </ButtonComponent>
        <ButtonComponent @click="onLoginClick">
          Zaloguj
        </ButtonComponent>
      </div>
      <div class="application-buttons">
        <a :href="facebookLink">
          <FacebookButton>Logowanie przez Facebook</FacebookButton>
        </a>
      <GoogleButton>Logowanie przez Google</GoogleButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputComponent from "../basic/InputComponent.vue";
import FormItem from "../FormItem.vue";
import ButtonComponent from "../basic/ButtonComponent.vue";
import {useRouter} from "vue-router";
import {$ref, $, $computed} from "vue/macros";
import FacebookButton from "../basic/FacebookButton.vue";
import GoogleButton from "../basic/GoogleButton.vue";
import {useAuth} from "../../composables/useAuth.js";
import {RouterName} from "../../enum/RouterName.js";
import axios from "axios";
import queryString from "query-string";
const {login} = $(useAuth())

const router = useRouter()

const mail = $ref<string>('')
const password = $ref<string>('')
const onRegisterClick = () => {
  router.push({path: '/register'})
}

const onLoginClick = async () => {
  const response = await login(mail, password)
  if(!response.success && response?.errors) {
    return alert(response.errors[0])
  }
  await router.push({name: RouterName.Coupons})
}

const facebookLink = $computed( () => {
  const query = queryString.stringify({
    client_id: '4363140387243775',
    redirect_uri: 'http://localhost:5173/',
    response_type: 'code',
    scope: 'email',
  })
  return `https://www.facebook.com/v18.0/dialog/oauth?${query}`;
})

</script>

<style scoped>
  h2 {
    text-align: center;
  }
  .login-panel{
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }

  .actions-buttons{
    width: 90%;
    padding: 10px 4px 20px 0;
    display: flex;
    justify-content: center;
    gap: 8px;
    box-sizing: border-box;
  }

  .application-buttons{
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }
</style>