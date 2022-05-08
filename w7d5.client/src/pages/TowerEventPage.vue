<template>
    <LoadingSpinner v-if="loading" />
    <div v-else class="flex-grow-1 d-flex flex-column align-items-center bg-dark fade-in">
        <div class="container">
            <div class="row mt-4">
                <div class="col-12">
                    <TowerEventDetails :towerEvent="towerEvent"/>
                </div>
            </div>
            <div class="row mt-4">
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
    setup()
    {
        const loading = ref(true);
        const route = useRoute();
        const attendees = computed(() => AppState.attendees);
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
            }
            catch(error)
            {
                logger.error("[TowerEventPage.vue > onMounted]", error.message);
                Pop.toast(error.message, "error");
            }
        });

        return {
            loading,
            towerEvent: computed(() => AppState.activeTowerEvent),
            attendees,
            account: computed(() => AppState.account),
            comments: computed(() =>
            {
                AppState.comments.forEach(comment => comment.attending = !!(attendees.value.find(attendee => attendee.id === comment.accountId)))
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