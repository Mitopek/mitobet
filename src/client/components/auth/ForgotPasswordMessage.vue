<template>
  <div class="login-panel">
    <h2>Reset hasła</h2>
    <div class="form">
      <div class="description">
         Mail został wysłany na podany adres. Link jest ważny przez 24h. Jeśli nie otrzymałeś maila sprawdź folder spam.
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
import {$ref, $} from "vue/macros";
import {useAuth} from "../../composables/useAuth.js";
import {useRouter} from "vue-router";
import ButtonComponent from "../basic/ButtonComponent.vue";
const {register} = $(useAuth())
const router = useRouter()

</script>

<style scoped>
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