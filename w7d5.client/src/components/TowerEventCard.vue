<template>
    <div class="col-12 col-lg-6 col-xl-3 p-2 towerevent-card bg-dark d-flex">
        <div class="bg-light flex-grow-1">
        </div>
    </div>
</template>

<script>
export default
{
    props:
    {
        event:
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
.towerevent-card
{
    height: 28vh;
}
</style>