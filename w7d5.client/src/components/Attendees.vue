<template>
    <div class="d-flex flex-column">
        <span class="text-dark lighten-40 mb-1 fs-5">See who is attending</span>
        <div class="bg-dark lighten-10 p-2 rounded">
            <span v-if="!(attendees.length > 0)" class="text-center d-block text-success darken-20 fs-2 fw-light fst-italic py-3">Be the first to attend</span>
            <Attendee v-for="a in attendees" :key="a.id" :attendee="a" />
        </div>
    </div>
</template>

<script>
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
            
        }
    }
}
</script>

<style lang="scss" scoped>

</style>