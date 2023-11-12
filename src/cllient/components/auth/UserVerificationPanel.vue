<template>
  <div class="login-panel">
    <h2>Weryfikacja użytkownika</h2>
    <div class="form">
      <div class="loading-wrapper" v-if="isLoading">
        <LoadingComponent/>
      </div>
      <div class="description" v-else-if="isVerified">
        Gratulacje! Konto zostało zweryfikowane.
      </div>
      <div class="description" v-else>
        Konto nie istnieje lub zostało juz zweryfikowane.
      </div>
      <div class="actions-buttons">
        <ButtonComponent @click="router.push('/')">
          Wróć do strony głownej
        </ButtonComponent>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from "../basic/ButtonComponent.vue";
import {useRoute, useRouter} from "vue-router";
import LoadingComponent from "../basic/LoadingComponent.vue";
import {$ref, $} from "vue/macros";
import {onMounted} from "vue";
import {useAuth} from "../../composables/useAuth.js";

const router = useRouter()
const route = useRoute()
let isLoading = $ref(true)
let isVerified = $ref(false)

const {verifyUser} = $(useAuth())

onMounted(async () => {
  const secret = route.params.secret
  const response = await verifyUser(secret as string)
  isLoading = false
  if(!response.success && response?.errors) {
    return
  }
  isVerified = true
})



</script>

<style scoped>
  .title {
    text-align: center;
    font-size: 32px;
    font-weight: 700;
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
    align-items: center;
    justify-content: center;
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