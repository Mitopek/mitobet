<template>
  <div class="login-panel">
    <h2>Reset hasła</h2>
    <div class="form">
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
        <ButtonComponent @click="onSubmit" :isLoading="isLoading">
          Zresetuj hasło
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
import {useRoute, useRouter} from "vue-router";
import {onMounted} from "vue";
const {resetPassword} = $(useAuth())

interface Emits {
  (e: 'submit'): void
}

const emit = defineEmits<Emits>()

const router = useRouter()
const route = useRoute()
const password = $ref<string>('')
const repeatedPassword = $ref<string>('')
const validateErrors = $ref({
  password: '',
  repeatedPassword: '',
})
let isLoading = $ref(false)
let secret = $ref('')
let error = $ref('')

onMounted(async () => {
  secret = route.params.secret as string
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
  if(password.length < 8) {
    throw new Error('Hasło musi mieć co najmniej 8 znaków.')
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
  if(!password || !repeatedPassword) {
    return error = 'Wypełnij poprawnie wymagane pola.'
  }
  if(Object.values(validateErrors).some(value => value)) {
    return error = 'Wypełnij poprawnie wymagane pola.'
  }
  isLoading = true
  const response = await resetPassword(secret, password)
  if(!response.success && response?.errors) {
    isLoading = false
    return error = response.errors[0]
  }
  isLoading = false
  emit('submit')
}

</script>

<style scoped>
.description{
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 10px;
}
.error{
  color: #c7c412;
  font-size: 13px;
  text-align: center;
  padding: 4px 0;
}
  .title {
    text-align: center;
    font-size: 32px;
    font-weight: 700;
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
</style>