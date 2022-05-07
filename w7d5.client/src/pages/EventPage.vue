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
                                <div class="d-flex flex-column pt-5 pb-4 px-4 flex-grow-1">
                                    <div class="d-flex justify-content-between">
                                        <span class="fs-4 fw-bold">{{towerEvent?.name}}</span>
                                        <span class="fs-4 fw-bold">{{towerEvent?.startDate}}</span>
                                    </div>
                                    <div class="d-flex justify-content-between text-info">
                                        <span class="fs-4">@{{towerEvent?.location}}</span>
                                        <span class="fs-4">starting {{towerEvent?.startTime}}</span>
                                    </div>
                                    <div class="flex-grow-1 mt-3 description-clip">
                                        <span class="fs-5">{{towerEvent?.description}}</span>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <span class="fs-4"><span class="fw-bold" :class="{'text-info': towerEvent?.capacity > 0, 'text-danger': towerEvent?.capacity <= 0}">{{towerEvent?.capacity}}</span> spots left</span>
                                        <button v-if="towerEvent?.capacity > 0" class="btn btn-warning px-4 py-2 no-select">Attend <i class="mdi mdi-human-handsup"></i></button>
                                        <button v-else class="btn btn-danger px-4 py-2 no-select not-allowed text-dark lighten-5">No spots left <i class="mdi mdi-human-handsdown"></i></button>
                                    </div>
                                    <div v-if="towerEvent.creatorId === account.id" class="towerevent-edit">
                                        <button class="btn towerevent-edit-button text-light px-3 py-1 fs-1"><i class="mdi mdi-dots-horizontal"></i></button>
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
            towerEvent: computed(() => AppState.activeTowerEvent),
            account: computed(() => AppState.account)
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

.not-allowed
{
    cursor: not-allowed;
}

.description-clip
{
    text-overflow: ellipsis;
    overflow-y: hidden;
}

.towerevent-edit
{
    position: absolute;
    top: 8px;
    right: 16px;
}

.towerevent-edit-button
{
    background-color: hsla(0, 0%, 100%, 0.3);
    line-height: 1rem !important;
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