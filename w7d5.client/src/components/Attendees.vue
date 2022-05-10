<template>
    <div class="d-flex flex-column no-select">
        <span class="text-dark lighten-60 mb-1 fs-5">See who is attending</span>
        <div class="bg-dark lighten-20 p-2 rounded shadow">
            <span v-if="!(attendees.length > 0) && capacity > 0" class="text-center d-block text-success darken-20 fs-2 fw-light fst-italic py-3">Be the first to attend</span>
            <span v-else-if="!(attendees.length > 0)" class="text-center d-block text-warning darken-20 fs-2 fw-light fst-italic py-3">No one is attending, but it's full up <span class="fst-normal">🤔</span></span>
            <Attendee v-for="a in attendees" :key="a.id" :attendee="a" />
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState.js'
export default
{
    props:
    {
        attendees:
        {
            type: Array,
            required: true
        }
    },

    setup()
    {
        return {
            capacity: computed(() => AppState.activeTowerEvent.capacity)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>