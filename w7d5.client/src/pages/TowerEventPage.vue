<template>
    <LoadingSpinner v-if="loading" />
    <div v-else class="flex-grow-1 d-flex flex-column align-items-center bg-dark" :class="{ 'fade-in': hasFadein }">
        <div class="container">
            <div class="row mt-4">
                <div class="col-12">
                    <TowerEventDetails v-if="towerEvent" :towerEvent="towerEvent"/>
                </div>
            </div>
            <div v-if="!towerEvent.isCanceled" class="row mt-4">
                <div class="col-12">
                    <Attendees :attendees="attendees" />
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-12 col-xl-10 offset-xl-1">
                    <Comments :comments="comments" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { towerEventsService } from '../services/TowerEventsService.js';
import { ticketsService } from '../services/TicketsService.js';
import { commentsService } from '../services/CommentsService.js';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import Loader from "../utils/Loader.js";
export default
{
    watch:
    {
        async 'route.params.id'(newRoute)
        {
            if(newRoute)
            {
                logger.log("Event route change detected")
                this.hasFadein = true;
                this.loading = true;
                towerEventsService.clearActive();
                ticketsService.clearActive();
                commentsService.clearActive();
                const loader = new Loader();
                loader.step(towerEventsService.getById, [newRoute]);
                loader.step(ticketsService.getByEvent, [newRoute]);
                loader.step(commentsService.getByEvent, [newRoute]);
                await loader.load();
                this.loading = false;
                //Modals broke with a parent that has animation fill mode, so this is to fix that
                setTimeout((() => this.hasFadein = false), 150)
            }
        }
    },

    setup()
    {
        const loading = ref(true);
        const route = useRoute();
        const attendees = computed(() => AppState.attendees);
        const hasFadein = ref(true);
        onMounted(async () =>
        {
            try
            {
                towerEventsService.clearActive();
                ticketsService.clearActive();
                commentsService.clearActive();
                loading.value = true;
                const loader = new Loader();
                loader.step(towerEventsService.getById, [route.params.id]);
                loader.step(ticketsService.getByEvent, [route.params.id]);
                loader.step(commentsService.getByEvent, [route.params.id]);
                await loader.load();
                loading.value = false;
                //Modals broke with a parent that has animation fill mode, so this is to fix that
                setTimeout((() => hasFadein.value = false), 150)
            }
            catch(error)
            {
                logger.error("[TowerEventPage.vue > onMounted]", error.message);
                Pop.toast(error.message, "error");
            }
        });

        return {
            route,
            loading,
            hasFadein,
            towerEvent: computed(() => AppState.activeTowerEvent),
            attendees,
            account: computed(() => AppState.account),
            comments: computed(() =>
            {
                AppState.comments.forEach(comment => comment.isAttending = !!(attendees.value.find(attendee => attendee.id === comment.creator.id)))
                return AppState.comments;
            })
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