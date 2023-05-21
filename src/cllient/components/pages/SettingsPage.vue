<template>
  <div class="settings-page">
    <ChangePasswordPanel/>
  </div>
</template>

<script setup lang="ts">
import ChangePasswordPanel from "../auth/ChangePasswordPanel.vue";
//TODO map responses, _id  , check validation of all html page

</script>

<style scoped>
.settings-page{
  padding: 15px;
  width: 40%;
}


</style>