<template>
    <ChangePasswordPanel v-if="isLocalUser"/>
</template>

<script setup lang="ts">
import ChangePasswordPanel from "../auth/ChangePasswordPanel.vue";
import {onMounted} from "vue";
import UniversalCookie from "universal-cookie";
import {RouterName} from "../../enum/RouterName.js";
import {$ref} from "vue/macros";
import {LoginType} from "../../../server/services/AuthService/enum/LoginType.js";

let isLocalUser = $ref(false)
onMounted( () => {
  const cookies = new UniversalCookie()
  isLocalUser = cookies.get('type') === LoginType.LOCAL
})

</script>

<style scoped>
.settings-page{
  padding: 15px;
  width: 100%;
  display: flex;
}


</style>