<template>
    <div class="d-flex ticket bg-dark lighten-20 my-5 shadow position-relative">
        <img :src="ticket.event.coverImg" class="event-image" alt="">
        <div class="d-flex flex-column ms-4 mt-4 flex-grow-1 justify-content-between">
            <div class="d-flex flex-column">
                <span class="fw-bold fs-5 mb-2">{{ticket.event.name}}</span>
                <span class="text-info fw-bold">{{ticket.event.location}}</span>
                <span class="text-info fw-bold">{{ticket.event.dateString}}</span>
            </div>
            <div class="align-self-center mb-3">
                <button class="btn btn-danger">Cancel Ticket</button>
            </div>
        </div>
        <div class="ticket-circle-div">
            <div class="ticket-circle bg-dark"></div>
        </div>
    </div>
</template>

<script>
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

    setup()
    {
        return {
            
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
</style>