<template>
  <div class="login-panel">
    <h2>Zadaj pytanie</h2>
    <div class="form">
      <div class="description">
        Wpisz swoje pytanie, a my odpowiemy na nie najszybciej jak to możliwe.
      </div>
      <FormItem title="Mail:" :error="validateErrors.mail">
        <InputComponent type="text" v-model="mail" @change="onMailInput" iconClass="fa-solid fa-user"/>
      </FormItem>
      <TextareaComponent v-model="question" :rows="10" placeholder="Wiadomość..."/>
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
import TextareaComponent from "./TextareaComponent.vue";
import axios from "axios";

interface Emits {
  (e: 'submit'): void
}

const emit = defineEmits<Emits>()

const router = useRouter()
const mail = $ref<string>('')
const question = $ref<string>('')
const validateErrors = $ref({
  mail: '',
})
let error = $ref('')
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
  if(!mail || !question) {
    return error = 'Wypełnij wszystkie pola.'
  }
  if(Object.values(validateErrors).some(value => value)) {
    return error = 'Wypełnij wszystkie pola.'
  }
  isLoading = true
  await axios.post(`${import.meta.env.VITE_API_HOST}/question`, {
    mail,
    question,
  })
  isLoading = false
  emit('submit')
}

</script>

<style scoped>
  .question{
    width: 100%;
    height: 200px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #c7c412;
    resize: none;
    font-size: 14px;
    font-weight: 400;
  }
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
    gap: 12px;
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