<template>
    <div class="flex-grow-1 d-flex flex-column align-items-center bg-dark">
        <div class="container">
            <div class="row mt-4">
                <div class="col-12">
                    <div class="towerevent-header card border-0">
                        <img :src="towerEvent?.coverImg" class="card-img" alt="">
                        <div class="card-img-overlay p-0 d-flex">
                            <div class="towerevent-overview d-flex flex-grow-1">
                                <div class="d-flex align-items-center justify-content-center">
                                    <img :src="towerEvent?.coverImg" class="towerevent-image p-3" />
                                </div>
                                <div class="d-flex flex-column py-5 px-4 flex-grow-1">
                                    <div class="d-flex justify-content-between">
                                        <span class="fs-4 fw-bold">{{towerEvent?.name}}</span>
                                        <span class="fs-4 fw-bold">{{towerEvent?.startDate}}</span>
                                    </div>
                                    <div class="d-flex justify-content-between text-info">
                                        <span class="fs-4">{{towerEvent?.location}}</span>
                                        <span class="fs-4d">{{towerEvent?.startTime}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { towerEventsService } from '../services/TowerEventsService.js';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
export default
{
    setup()
    {
        const route = useRoute();
        onMounted(async () =>
        {
            try
            {
                await towerEventsService.getById(route.params.id);
            }
            catch(error)
            {
                logger.error("[EventPage.vue > onMounted]", error.message);
                Pop.toast(error.message, "error");
            }
        });

        return {
            towerEvent: computed(() => AppState.activeTowerEvent)
        }
    }
}
</script>

<style lang="scss" scoped>
.towerevent-header
{
    height: 25rem;
}

.card-img
{
    height: 100%;
    object-fit: cover;
}

.towerevent-overview
{
    background-color: hsla(192, 00%, 0%, 0.5);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
}

.towerevent-image
{
    height: 20rem;
    width: 20rem;
    object-fit: cover;
}

// REVIEW does this need to change on mobile
@media only screen and (max-width: 1200px)
{
    .towerevent-image
    {
        height: 20rem;
        width: 20rem;
    }

    .towerevent-header
    {
        height: 25rem;
    }
}
</style>