<template>
  <div class="login-panel">
    <h2>Rejestracja</h2>
    <div class="form">
      <FormItem title="Mail:" :error="validateErrors.mail">
        <InputComponent type="text" v-model="mail" @input="onMailInput" iconClass="fa-solid fa-user"/>
      </FormItem>
      <FormItem title="Hasło:" :error="validateErrors.password">
        <InputComponent type="password" v-model="password" @input="onPasswordInput" iconClass="fa-solid fa-lock"/>
      </FormItem>
      <FormItem title="Powtórz hasło:" :error="validateErrors.repeatedPassword">
        <InputComponent type="password" v-model="repeatedPassword" @input="onRepeatedPasswordInput" iconClass="fa-solid fa-lock"/>
      </FormItem>
      <div class="checkbox-wrapper"><CheckboxComponent :value="hasAcceptedPrivatePolicy" @click="hasAcceptedPrivatePolicy = !hasAcceptedPrivatePolicy"/>Zapoznałem się i akceptuję <span class="text"><a href="/private-policy">politykę prywatności</a> serwisu.</span></div>
      <div class="checkbox-wrapper"><CheckboxComponent :value="hasAcceptedRegulations" @click="hasAcceptedRegulations = !hasAcceptedRegulations"/>Zapoznałem się i akceptuję <span class="text"><a href="/regulations">regulamin</a> serwisu.</span></div>
      <div class="actions-buttons">
        <ButtonComponent @click="router.push('/')" type="secondary">
          Wróć do strony głownej
        </ButtonComponent>
        <ButtonComponent @click="onRegisterClick" :isLoading="isLoading">
          Zarejestruj się
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
import CheckboxComponent from "../basic/CheckboxComponent.vue";
const {register} = $(useAuth())

interface Emits {
  (e: 'submit'): void
}

const emit = defineEmits<Emits>()

const router = useRouter()
const mail = $ref<string>('')
const password = $ref<string>('')
const repeatedPassword = $ref<string>('')
const validateErrors = $ref({
  mail: '',
  password: '',
  repeatedPassword: '',
})
let isLoading = $ref(false)
let hasAcceptedPrivatePolicy = $ref(false)
let hasAcceptedRegulations = $ref(false)

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
  if(!hasAcceptedPrivatePolicy || !hasAcceptedRegulations) {
    return alert('Musisz zaakceptować regulamin i politykę prywatności.')
  }
  if(!mail || !password || !repeatedPassword) {
    return alert('Wypełnij poprawnie wymagane pola.')
  }
  if(Object.values(validateErrors).some(value => value)) {
    return alert('Wypełnij poprawnie wymagane pola.')
  }
  isLoading = true
  const response = await register(mail, password, hasAcceptedPrivatePolicy, hasAcceptedRegulations)
  if(!response.success && response?.errors) {
    isLoading = false
    return alert(response.errors[0])
  }
  isLoading = false
  emit('submit')
}

</script>

<style scoped lang="scss">
@use '../../variables.scss' as variables;
.description{
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 10px;
}
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
.checkbox-wrapper{
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  font-size: 14px;
}

  .form {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .actions-buttons{
    width: 100%;
    padding: 20px 5px 10px 5px;
    display: flex;
    justify-content: center;
    gap: 8px;
  }
a{
  color: map-get(variables.$colors, primary);
  text-decoration: underline;
}
</style>