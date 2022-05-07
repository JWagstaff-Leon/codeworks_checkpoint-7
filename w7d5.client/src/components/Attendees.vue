<template>
    <div class="d-flex flex-column">
        <span>See who is attending</span>
        <div class="bg-dark lighten-10 p-2 rounded">
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