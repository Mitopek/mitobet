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
      <FacebookButton>Logowanie przez Facebooka</FacebookButton>
      <GoogleButton>Logowanie przez Google</GoogleButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputComponent from "./basic/InputComponent.vue";
import FormItem from "./FormItem.vue";
import ButtonComponent from "./basic/ButtonComponent.vue";
import {useRouter} from "vue-router";
import {$ref, $} from "vue/macros";
import FacebookButton from "./basic/FacebookButton.vue";
import GoogleButton from "./basic/GoogleButton.vue";
import {useAuth} from "../composables/useAuth.js";
import {RouterName} from "../enum/RouterName.js";
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
    gap: 5px;
  }

  .actions-buttons{
    width: 100%;
    padding: 10px 5px;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }

  .application-buttons{
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
</style>