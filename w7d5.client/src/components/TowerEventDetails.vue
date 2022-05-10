<template>
    <div class="towerevent-header card border-0 no-select shadow">
        <img :src="towerEvent?.coverImg" class="card-img" :alt="'Event image for ' + towerEvent?.name" draggable="false">
        <div class="card-img-overlay p-0 d-flex flex-grow-1">
            <div class="towerevent-overview d-flex flex-column flex-xl-row flex-grow-1 w-100 bg-dark lighten-20">
                <div class="d-flex align-items-center justify-content-center">
                    <img :src="towerEvent?.coverImg" class="towerevent-image p-3 mt-4 mt-xl-0" :alt="'Event image for ' + towerEvent?.name" draggable="false"/>
                </div>
                <div class="d-flex flex-column pt-2 pt-xl-5 pb-4 px-3 px-lg-4 flex-grow-1 details-side">
                    <div class="d-flex flex-column flex-lg-row justify-content-between">
                        <span class="fs-4 fw-bold pe-0 pe-lg-2 pe-xl-0">{{towerEvent?.name}}</span>
                        <span class="fs-4 fw-bold ps-0 ps-lg-2 ps-xl-0">{{towerEvent?.dateString}}</span>
                    </div>
                    <div class="d-flex flex-column flex-lg-row justify-content-between text-primary">
                        <span class="fs-4 pe-0 pe-lg-2 pe-xl-0">@ {{towerEvent?.location}}</span>
                        <span class="fs-4 ps-0 ps-lg-2 ps-xl-0">starting {{towerEvent?.timeString}}</span>
                    </div>
                    <div class="flex-grow-1 mt-3 mb-2">
                        <span class="fs-6 fw-bold word-break">{{towerEvent?.description}}</span>
                    </div>
                    <div v-if="towerEvent?.isCanceled" class="rounded bg-danger text-dark w-100 text-center fw-bolder pb-1 mt-1 fs-4 not-allowed">Event is cancelled <i class="mdi mdi-human-handsdown"></i></div>
                    <div v-else class="d-flex justify-content-between mt-2">
                        <div>
                            <span class="fs-4"><span class="fw-bold" :class="{'text-primary': towerEvent?.capacity > 0, 'text-danger': towerEvent?.capacity <= 0}">{{towerEvent?.capacity}}</span> spot<span v-if="towerEvent.capacity != 1">s</span> left</span>
                        </div>
                        <div v-if="account.id" class="d-flex align-items-center justify-content-center">
                            <div v-if="!userTicketsLoaded" class="spinner-border text-primary"></div>
                            <button v-else-if="userRegistered" class="btn btn-warning px-4 py-2 no-select" @click="unattend">Cancel Ticket <i class="mdi mdi-human-handsdown"></i></button>
                            <button v-else-if="towerEvent?.capacity > 0" class="btn btn-info px-4 py-2 no-select" @click="attend">Attend <i class="mdi mdi-human-handsup"></i></button>
                            <button v-else class="btn btn-danger px-4 py-2 no-select not-allowed text-dark lighten-5">No spots left <i class="mdi mdi-human-handsdown"></i></button>
                        </div>
                    </div>
                    <div v-if="!towerEvent.isCanceled && towerEvent?.creatorId === account.id" class="towerevent-edit dropdown">
                        <button class="btn towerevent-edit-button text-light px-3 py-1 fs-1" title="Manage your event" data-bs-toggle="dropdown" aria-expanded="false"><i class="mdi mdi-dots-horizontal"></i><span class="visually-hidden" id="manage-event-button-label">Manage your event</span></button>
                        <ul class="dropdown-menu" aria-labelledby="manage-event-button-label">
                            <li class="dropdown-item no-select action" data-bs-toggle="modal" data-bs-target="#edit-event-modal">edit event</li>
                            <li class="dropdown-item text-danger no-select action" @click="cancelEvent">cancel event</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Modal id="edit-event-modal">
        <template #modal-title-slot>
            <h4>Edit Event</h4>
        </template>
        
        <template #modal-body-slot>
            <TowerEventForm :towerEvent="towerEvent" />
        </template>
    </Modal>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
import { ticketsService } from '../services/TicketsService.js'
import { useRoute } from 'vue-router'
import { towerEventsService } from '../services/TowerEventsService.js'
export default
{
    props:
    {
        towerEvent:
        {
            type: Object,
            required: true
        }
    },

    setup(props)
    {
        const route = useRoute();
        return {
            account: computed(() => AppState.account),
            userTicketsLoaded: computed(() => !!(AppState.userTickets)),
            userRegistered: computed(() => AppState.userTickets.find(ticket => ticket.eventId === props.towerEvent.id)?.id),
            async attend()
            {
                try
                {
                    await ticketsService.attendEvent(route.params.id);
                    Pop.toast("You are registered to attend " + props.towerEvent.name + "!", "success");
                }
                catch(error)
                {
                    logger.error("[TowerEventDetails.vue > attend]", error.message);
                    Pop.toast(error.message, "error");
                }
            },
            async unattend()
            {
                try
                {
                    if(await Pop.confirm())
                    {
                        const id = (AppState.userTickets.find(ticket => ticket.eventId === route.params.id)).id;
                        await ticketsService.unattendEvent(id);
                        Pop.toast("You have unregistered from " + props.towerEvent.name + ".")
                    }
                }
                catch(error)
                {
                    logger.error("[TowerEventDetail.vue > unattend]", error.message);
                    Pop.toast(error.message, "error");
                }
            },
            async cancelEvent()
            {
                try
                {
                    if(await Pop.confirm())
                    {
                        await towerEventsService.cancelEvent(route.params.id);
                        Pop.toast("Event cancelled successfully.", "success");
                    }
                }
                catch(error)
                {
                    logger.error("[TowerEventDetails > cancelEvent]", error.message);
                    Pop.toast(error.message, "error");
                }
            }
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
    background-color: hsla(192, 00%, 0%, 0.65) !important;
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

.details-side
{
    max-width: calc(100% - 20rem);
}

.word-break
{
    word-wrap: break-word;
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

@media only screen and (max-width: 1200px)
{
    .towerevent-overview
    {
        background-color: #555b75 !important;
    }
    .towerevent-image
    {
        height: 10rem;
        width: 20rem;
    }

    .towerevent-header
    {
        min-height: unset;
        height: unset;
    }

    .details-side
    {
        max-width: 100%;
    }

    .card-img
    {
        display: none
    }

    .card-img-overlay
    {
        position: unset;
    }
}
</style>