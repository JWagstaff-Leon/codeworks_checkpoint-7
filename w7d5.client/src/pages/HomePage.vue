<template>
    <LoadingSpinner v-if="!towerEvents" />
    <div v-else class="flex-grow-1 d-flex flex-column align-items-center bg-dark fade-in">
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
import { computed, ref } from '@vue/reactivity'
import { AppState } from '../AppState.js'
import { onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop.js'
import { logger } from '../utils/Logger.js'
import { towerEventsService } from "../services/TowerEventsService.js";
export default {
  name: 'Home',
  setup()
    {
        // const loading = ref(true);
        // onMounted(async () => 
        // {
        //     try
        //     {
        //         towerEventsService.clearActive();
        //         loading.value = true;
        //         await towerEventsService.getAll();
        //         loading.value = false;
        //     }
        //     catch(error)
        //     {
        //         logger.error("[HomePage.vue > onMounted]", error.message);
        //         Pop.toast(error.message, "error");
        //     }
        // });
    
        return {
            // loading,
            towerEvents: computed(() => AppState.towerEvents),
        }
    }
}
</script>

<style scoped lang="scss">
</style>
