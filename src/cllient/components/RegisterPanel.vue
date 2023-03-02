<template>
  <div class="login-panel">
    <span class="title">Rejestracja</span>
    <div class="form">
      <FormItem title="Mail:">
        <InputComponent type="text" v-model="mail"/>
      </FormItem>
      <FormItem title="Hasło:">
        <InputComponent type="password" v-model="password"/>
      </FormItem>
      <FormItem title="Potwórz hasło:">
        <InputComponent type="password" v-model="repeatedPassword"/>
      </FormItem>
      <div class="actions-buttons">
        <ButtonComponent @click="onRegisterClick">
          Zarejestruj
        </ButtonComponent>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputComponent from "./basic/InputComponent.vue";
import FormItem from "./FormItem.vue";
import ButtonComponent from "./basic/ButtonComponent.vue";
import {$ref, $} from "vue/macros";
import {useAuth} from "../composables/useAuth";
const {register} = $(useAuth())

const mail = $ref<string>('')
const password = $ref<string>('')
const repeatedPassword = $ref<string>('')

const onRegisterClick = () => {
  register(mail, password)
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
    justify-content: center;
    gap: 8px;
  }
</style>