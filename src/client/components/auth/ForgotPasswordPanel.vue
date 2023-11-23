<template>
  <div class="login-panel">
    <h2>Reset hasła</h2>
    <div class="form">
      <div class="description">
        Jeśli podany mail istnieje w bazie danych zostanie wysłany link do resetu hasła.
      </div>
      <FormItem title="Mail:" :error="validateErrors.mail">
        <InputComponent type="text" v-model="mail" @change="onMailInput" iconClass="fa-solid fa-user"/>
      </FormItem>
      <div class="error" v-if="error">
        {{error}}
      </div>
      <div class="actions-buttons">
        <ButtonComponent @click="router.push('/')" type="secondary">
          Wróć do strony głownej
        </ButtonComponent>
        <ButtonComponent :isLoading="isLoading" @click="onSubmit">
          Wyślij
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
import {useRouter} from "vue-router";
import {useAuth} from "../../composables/useAuth.js";

interface Emits {
  (e: 'submit'): void
}

const emit = defineEmits<Emits>()

const router = useRouter()
const mail = $ref<string>('')
const validateErrors = $ref({
  mail: '',
})
let error = $ref('')
const {forgotPassword} = $(useAuth())
let isLoading = $ref(false)

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


const onSubmit = async () => {
  if(!mail) {
    return error = 'Wypełnij poprawnie wymagane pola.'
  }
  if(Object.values(validateErrors).some(value => value)) {
    return error = 'Wypełnij poprawnie wymagane pola.'
  }
  isLoading = true
  const response = await forgotPassword(mail)
  if(!response.success && response?.errors) {
    isLoading = false
    return error = response.errors[0]
  }
  isLoading = false
  emit('submit')
}

</script>

<style scoped>
  .title {
    text-align: center;
    font-size: 32px;
    font-weight: 700;
  }
  .error{
    color: #c7c412;
    font-size: 13px;
    text-align: center;
    padding: 4px 0;
  }
  .description{
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 10px;
  }
  .login-panel{
    display: flex;
    flex-direction: column;
    align-items: center;
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


  @media (max-width: 400px) {
    .actions-buttons{
      flex-direction: column-reverse;
      gap: 5px;
    }
  }
</style>