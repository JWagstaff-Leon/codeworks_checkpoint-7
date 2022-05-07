<template>
    <div class="flex-grow-1 d-flex flex-column align-items-center bg-dark">
        <div class="container">
            <div class="row mt-4">
                <div class="col-12">
                    <TowerEventDetails :towerEvent="towerEvent"/>
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
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
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

.dropdown-item
{
    text-align: center;
}

// REVIEW does this need to change on mobile
@media only screen and (max-width: 1200px)
{
    .towerevent-image
    {
        height: 10rem;
        width: 20rem;
    }

    .towerevent-header
    {
        min-height: 90vh;
    }

    .description-clip
    {
        // max-height: 55%;
        max-height: calc(100% - 210px);
    }
}
</style>