<template>
  <div class="change-password-panel">
    <div class="header-wrapper">
      <h2>Zmień hasło</h2>
    </div>
    <div class="form">
      <FormItem title="Stare hasło:">
        <InputComponent type="password" v-model="oldPassword" iconClass="fa-solid fa-lock"/>
      </FormItem>
      <FormItem title="Hasło:" :error="validateErrors.password">
        <InputComponent type="password" v-model="password" @input="onPasswordInput" iconClass="fa-solid fa-lock"/>
      </FormItem>
      <FormItem title="Powtórz hasło:" :error="validateErrors.repeatedPassword">
        <InputComponent type="password" v-model="repeatedPassword" @input="onRepeatedPasswordInput" iconClass="fa-solid fa-lock"/>
      </FormItem>
      <div class="error" v-if="error">
        {{error}}
      </div>
      <div class="actions-buttons">
        <ButtonComponent @click="onSubmit">
          Zmień hasło
        </ButtonComponent>
      </div>
      <div v-if="isSuccess" class="success-wrapper">Hasło zostało zmienione</div>
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
const {changePassword} = $(useAuth())

const router = useRouter()
let error = $ref('')
const oldPassword = $ref<string>('')
const password = $ref<string>('')
const repeatedPassword = $ref<string>('')

let isSuccess = $ref(null)

const validateErrors = $ref({
  password: '',
  repeatedPassword: '',
})

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

const onSubmit = async () => {
  if(!oldPassword || !password || !repeatedPassword) {
    return error = 'Wypełnij poprawnie wymagane pola.'
  }
  if(Object.values(validateErrors).some(value => value)) {
    return error = 'Wypełnij poprawnie wymagane pola.'
  }
  const response = await changePassword(oldPassword, password)
  if(!response.success && response?.errors) {
    return error = response.errors[0]
  }
  isSuccess = true
}

</script>

<style scoped lang="scss">
@use '../../variables.scss' as variables;
.error{
  color: #c7c412;
  font-size: 13px;
  text-align: center;
  padding: 4px 0;
}
  .header-wrapper {
    width: 100%;
    text-align: center;
  }
  .change-password-panel{
    display: flex;
    flex-direction: column;
    gap: 2px;
    max-width: 500px;
    width: 100%;
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

  .success-wrapper{
    width: 100%;
    text-align: center;
    color: map-get(variables.$colors, primary);
  }
</style>