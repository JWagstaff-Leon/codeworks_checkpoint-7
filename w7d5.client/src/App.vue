<template>
  <header>
  </header>
  <main class="d-flex flex-column flex-xl-row-reverse">
    <Navbar />
    <div class="d-flex flex-column flex-grow-1 bg-dark main-view">
        <div class="d-flex bg-dark">
            <router-link class="d-none d-xl-inline-block no-link-style bg-dark pe-4" :to="{name: 'Home'}">
                <span class="text-light fs-1 ps-4 d-inline no-select" title="Go to home page">the t<img src="./assets/img/tower_logo.svg" height="48" alt="">wer</span>
            </router-link>
            <div class="flex-grow-1"></div>
        </div>
        <router-view />
    </div>
  </main>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from './AppState'
import { towerEventsService } from './services/TowerEventsService.js';
export default {
  name: 'App',
  setup() {
      onMounted(() =>
      {
          towerEventsService.getAll();
      });

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
.main-view
{
    overflow-y: scroll;
    scrollbar-width: thin;
}
</style>
