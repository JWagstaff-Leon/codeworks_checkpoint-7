<template>
  <header>
  </header>
  <main class="d-flex flex-column flex-xl-row-reverse">
    <Navbar />
    <div class="d-flex flex-column flex-grow-1">
        <span class="bg-dark text-light fs-1 ps-4 d-none d-xl-inline">the t<img src="./assets/img/tower_logo.svg" height="48" alt="">wer</span>
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

</style>
