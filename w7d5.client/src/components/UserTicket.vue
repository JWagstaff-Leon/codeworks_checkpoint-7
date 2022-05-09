<template>
    <div class="d-flex ticket bg-dark lighten-20 my-5 shadow position-relative">
        <img :src="ticket.event.coverImg" class="event-image" alt="">
        <div class="d-flex flex-column ms-2 mt-2 ms-md-4 mt-md-4 flex-grow-1 justify-content-between">
            <div class="d-flex flex-column">
                <span class="fw-bold fs-6 fs-md-5 mb-md-2">{{ticket.event.name}}</span>
                <span class="text-info fw-md-bold">{{ticket.event.location}}</span>
                <span class="text-info fw-md-bold">{{ticket.event.dateString}}</span>
            </div>
            <div class="align-self-center mb-1 mb-md-3">
                <button class="btn btn-danger" @click="cancelTicket">Cancel Ticket</button>
            </div>
        </div>
        <div class="ticket-circle-div">
            <div class="ticket-circle bg-dark"></div>
        </div>
    </div>
</template>

<script>
import { ticketsService } from '../services/TicketsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
export default
{
    props:
    {
        ticket:
        {
            type: Object, 
            required: true
        }
    },

    setup(props)
    {
        return {
            async cancelTicket()
            {
                try
                {
                    if(await Pop.confirm())
                    {
                        await ticketsService.unattendEvent(props.ticket.id);
                        Pop.toast("You have unregistered from " + props.ticket.event.name + ".");
                    }
                }
                catch(error)
                {
                    logger.error("[UserTicket.vue > cancelTicket]", error.message);
                    Pop.toast(error.message, "error");
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.ticket
{
    height: 13rem;
}
.event-image
{
    height: 13rem;
    width: 13rem;
    object-fit: cover;
}
.ticket-circle-div
{
    position: relative;
    right: 0px;
    top: 6.5rem;
}
.ticket-circle
{
    position: absolute;
    height: 8rem;
    width: 8rem;
    left: -4rem;
    top: -4rem;
    border-radius: 50%;
}

@media only screen and (max-width: 768px)
{
    .ticket
    {
        height: 10rem;
    }
    .event-image
    {
        height: 10rem;
        width: 5rem;
        object-fit: cover;
    }

    .ticket-circle-div
    {
        position: relative;
        right: 0px;
        top: 5rem;
    }
    .ticket-circle
    {
        position: absolute;
        height: 15vw;
        width: 15vw;
        left: -7.5vw;
        top: -7.5vw;
        border-radius: 50%;
    }
}
</style>