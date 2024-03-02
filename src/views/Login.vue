<template>
  <div class="row justify-content-center mt-5">
    <div class="w-25 mt-4">
      <input
        class="form-control text-secondary"
        type="email"
        placeholder="Enter email"
        v-model="username"
        aria-label="default input example"
      />
      <input
        class="form-control text-secondary mt-3"
        type="password"
        placeholder="Enter password"
        v-model="password"
        aria-label="default input example"
        v-on:keyup.enter="login"
      />
      <div class="mt-3">
        <button type="button" class="btn btn-sm btn-secondary w-100" @click="login">Login</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore.js'

const userStore = useUserStore()

const username = ref('')
const password = ref('')

function login() {
  userStore.login(username.value, password.value)
}
</script>
<style lang="scss" scoped></style>
