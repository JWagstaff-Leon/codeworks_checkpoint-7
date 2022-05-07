<template>
    <div class="position-relative d-inline-block">
        <img :src="attendee.picture" @mouseenter="toggleName" @mouseleave="toggleName" />
        <span :id="'attendee-' + attendee.id" class="border-2 rounded-3 py-2 px-3 text-light bg-dark darken-10 visually-hidden fade-out">{{attendee.name}}</span>
    </div>
</template>

<script>
import { logger } from '../utils/Logger.js';
export default
{
    props:
    {
        attendee:
        {
            type: Object,
            required: true
        }
    },

    setup(props)
    {
        return {
            toggleName()
            {
                document.getElementById("attendee-" + props.attendee.id).classList.remove("visually-hidden");
                document.getElementById("attendee-" + props.attendee.id).classList.toggle("fade-in");
                document.getElementById("attendee-" + props.attendee.id).classList.toggle("fade-out");
                logger.log("moose")
            }
        }
    }
}
</script>

<style lang="scss" scoped>
img
{
    border-radius: 50%;
    object-fit: cover;
    height: 3.5rem;
    width: 3.5rem;
}

span
{
    position: absolute;
    top: -2.5rem;
    right: -1rem;
}
</style>