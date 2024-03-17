<template>
  <div>
    <div class="container row justify-content-end">
      <div class="col-1">
        <button
          type="button"
          class="btn btn-outline-success"
          v-if="isAuthenticated"
          @click="logout"
        >
          Logout
        </button>
        <button
          type="button"
          class="btn btn-outline-success"
          v-if="!isAuthenticated"
          @click="logout"
        >
          Login
        </button>
      </div>
    </div>

    <div class="container text-center row justify-content-center">
      <div class="w-50 mt-0 row header">
        <div class="col nav-item">
          <h3>
            <router-link to="/edit" class="header__nav-name" v-if="isAuthenticated">
              Edit
            </router-link>
          </h3>
        </div>
        <div class="col nav-item">
          <h3>
            <router-link to="/view" class="header__nav-name" v-if="isAuthenticated">
              View</router-link
            >
          </h3>
        </div>
      </div>
    </div>
    <RouterView />
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useUserStore } from './stores/userStore.js'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

function logout() {
  userStore.logout()
}

const isAuthenticated = computed(() => {
  if (!userStore.getIsAuthenticated) {
    router.push('/login')
  }
  return userStore.getIsAuthenticated
})
</script>

<style lang="scss" scoped>
.bg-color1 {
  background-color: #eee;
}
.header {
  &__nav-name {
    font-weight: 600;
  }
}
.nav-item {
  &:hover {
    cursor: pointer;
  }
  & a {
    color: rgb(41, 41, 41);
    text-decoration: none;
    &:hover {
      color: rgb(141, 141, 141);
    }
  }
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
