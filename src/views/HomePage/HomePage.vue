<script setup lang="ts">
import {clearToken, getToken} from "@/composables/login.ts";
import {useRouter} from "vue-router";
import {tokenStore} from "@/stores/tokenData.ts";

const router = useRouter();
const store = tokenStore();

const deleteToken = async () => {
  await store.deleteToken();
  clearToken();
  await router.push("/login");
}
</script>

<template>
<div class="home-description">
    <button type="submit" class="confirm-button" @click="deleteToken" :disabled="false">выйти</button>
</div>
</template>

<style scoped lang="scss">

.confirm-button {
   width: 8rem;
   height: 2.75rem;
   border-radius: 0.5rem;
   color: #fff;
 }
</style>
