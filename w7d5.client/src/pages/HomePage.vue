<template>
  <div class="flex-grow-1 d-flex flex-column align-items-center bg-dark">
      <div class="container">
          <div class="row">
              <div class="col-12"></div>
          </div>
          <div class="row">
              <TowerEventCard v-for="t in towerEvents" :key="t.id" :towerEvent="t" />
          </div>
      </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState.js'
import { onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop.js'
import { logger } from '../utils/Logger.js'
import { towerEventsService } from "../services/TowerEventsService.js";
export default {
  name: 'Home',
  setup()
    {
        onMounted(async () => 
        {
            try
            {
                await towerEventsService.getAll();
            }
            catch(error)
            {
                logger.error("[HomePage.vue > onMounted]", error.message);
                Pop.toast(error.message, "error");
            }
        });
    
        return {
            towerEvents: computed(() => AppState.towerEvents),
        }
    }
}
</script>

<style scoped lang="scss">
</style>
