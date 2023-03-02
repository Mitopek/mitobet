<template>
  <div class="login-panel">
    <span class="title">Zaloguj się</span>
    <div class="form">
      <FormItem title="Mail:">
        <InputComponent type="text" v-model="mail"/>
      </FormItem>
      <FormItem title="Hasło:">
        <InputComponent type="password" v-model="password"/>
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
const {login} = $(useAuth())

const router = useRouter()

const mail = $ref<string>('')
const password = $ref<string>('')
const onRegisterClick = () => {
  router.push({path: '/register'})
}

const onLoginClick = () => {
  login(mail, password)
}

</script>

<style scoped>
  .title {
    text-align: center;
    font-size: 32px;
    font-weight: 700;
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