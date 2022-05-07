<template>
  <header>
  </header>
  <main class="d-flex flex-column flex-xl-row-reverse">
    <Navbar />
    <div class="d-flex flex-column flex-grow-1">
        <router-link class="d-none d-xl-inline no-link-style bg-dark" :to="{name: 'Home'}">
            <span class="text-light fs-1 ps-4">the t<img src="./assets/img/tower_logo.svg" height="48" alt="">wer</span>
        </router-link>
        <router-view />
    </div>
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.no-link-style
{
    color: inherit;
}
</style>
