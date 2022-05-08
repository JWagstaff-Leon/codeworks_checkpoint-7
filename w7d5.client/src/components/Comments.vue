<template>
    <div class="d-flex flex-column">
        <span class="text-dark lighten-40 mb-1 fs-5">What people are saying</span>
        <div class="bg-dark lighten-20 p-4">
            <CreateComment />
            <Comment v-for="c in comments" :key="c.id" :comment="c" />
        </div>
    </div>
</template>

<script>
export default
{
    props:
    {
        comments:
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