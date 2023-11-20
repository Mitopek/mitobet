<template>
  <div class="consents-panel">
      <h2>Zaakceptuj zgody, by móc w pełni korzystać z serwisu</h2>
    <div class="form">
      <div class="checkbox-container">
        <div class="checkbox-wrapper"><CheckboxComponent :value="hasAcceptedPrivatePolicy" @click="hasAcceptedPrivatePolicy = !hasAcceptedPrivatePolicy"/><span class="text">Zapoznałem się i akceptuję <a href="/private-policy">politykę prywatności</a> serwisu.</span></div>
        <div class="checkbox-wrapper"><CheckboxComponent :value="hasAcceptedRegulations" @click="hasAcceptedRegulations = !hasAcceptedRegulations"/> <span class="text">Zapoznałem się i akceptuję <a href="/regulations">regulamin</a> serwisu.</span></div>
      </div>
      <div class="actions-buttons">
        <ButtonComponent @click="router.push('/')" type="secondary">
          Wróć do strony głownej
        </ButtonComponent>
        <ButtonComponent @click="emit('accept')" :is-disabled="!hasAcceptedPrivatePolicy || !hasAcceptedRegulations">
          Zaakceptuj
        </ButtonComponent>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ModalComponent from "./basic/ModalComponent.vue";
import ButtonComponent from "./basic/ButtonComponent.vue";
import CheckboxComponent from "./basic/CheckboxComponent.vue";
import {$ref} from "vue/macros";
import {useRouter} from "vue-router";

interface Emits {
  (e: 'accept'): void
}

const emit = defineEmits<Emits>()

const router = useRouter()
let hasAcceptedPrivatePolicy = $ref(false)
let hasAcceptedRegulations = $ref(false)
</script>

<style scoped lang="scss">
@use '../variables.scss' as variables;
.title {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
}

.checkbox-container{
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

a{
  color: map-get(variables.$colors, primary);
  text-decoration: underline;
}

.form{
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

.checkbox-wrapper{
  align-items: flex-start;
  display: flex;
  gap: 6px;
  width: 100%;
  font-size: 14px;
  overflow-wrap: break-word;
  word-wrap: break-word;
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