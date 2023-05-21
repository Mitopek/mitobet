<template>
  <div class="login-panel">
    <span class="title">Rejestracja</span>
    <div class="form">
      <FormItem title="Mail:" :error="validateErrors.mail">
        <InputComponent type="text" v-model="mail" @change="onMailInput"/>
      </FormItem>
      <FormItem title="Hasło:" :error="validateErrors.password">
        <InputComponent type="password" v-model="password" @change="onPasswordInput"/>
      </FormItem>
      <FormItem title="Potwórz hasło:" :error="validateErrors.repeatedPassword">
        <InputComponent type="password" v-model="repeatedPassword" @change="onRepeatedPasswordInput"/>
      </FormItem>
      <div class="actions-buttons">
        <ButtonComponent @click="router.push('/')">
          Wróć do strony głownej
        </ButtonComponent>
        <ButtonComponent @click="onRegisterClick">
          Zarejestruj
        </ButtonComponent>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputComponent from "../basic/InputComponent.vue";
import FormItem from "../FormItem.vue";
import ButtonComponent from "../basic/ButtonComponent.vue";
import {$ref, $} from "vue/macros";
import {useAuth} from "../../composables/useAuth.js";
import {useRouter} from "vue-router";
const {register} = $(useAuth())

const router = useRouter()
const mail = $ref<string>('')
const password = $ref<string>('')
const repeatedPassword = $ref<string>('')
const validateErrors = $ref({
  mail: '',
  password: '',
  repeatedPassword: '',
})

const onMailInput = () => {
  try {
    validateErrors["mail"] = ''
    validateMail()
  } catch (e) {
    if (e instanceof Error) {
      validateErrors["mail"] = e.message;
    }
  }
}

const onPasswordInput = () => {
  try {
    validateErrors["password"] = ''
    validatePassword()
  } catch (e) {
    if (e instanceof Error) {
      validateErrors["password"] = e.message;
    }
  }
  onRepeatedPasswordInput()
}

const onRepeatedPasswordInput = () => {
  try {
    validateErrors["repeatedPassword"] = ''
    validateRepeatedPassword()
  } catch (e) {
    if (e instanceof Error) {
      validateErrors["repeatedPassword"] = e.message;
    }
  }
}

const validateMail = () => {
  if(!mail) {
    throw new Error('Wypełnij mail.')
  }
  const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if(!mailRegex.test(mail)) {
    throw new Error('Nieprawidłowy mail.')
  }
  return mailRegex.test(mail)
}

const validatePassword = () => {
  if(!password) {
    throw new Error('Wypełnij hasło.')
  }
  if(password.length < 8 && password.length <= 32) {
    throw new Error('Hasło musi mieć od 8 do 32 znaków.')
  }
  if(!/\d/.test(password)) {
    throw new Error('Hasło musi zawierać co najmniej jedną cyfrę.')
  }
}

const validateRepeatedPassword = () => {
  if(password !== repeatedPassword) {
    throw new Error('Hasła nie są takie same.')
  }
}

const onRegisterClick = async () => {
  if(!mail || !password || !repeatedPassword) {
    return alert('Wypełnij poprawnie wymagane pola.')
  }
  if(Object.values(validateErrors).some(value => value)) {
    return alert('Wypełnij poprawnie wymagane pola.')
  }
  const response = await register(mail, password)
  if(!response.success && response?.errors) {
    return alert(response.errors[0])
  }
  await router.push({path: '/'})
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