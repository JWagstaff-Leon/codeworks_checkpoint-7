<template>
    <img :src="attendee.picture">
</template>

<script>
export default
{
    setup()
    {
        return {
            
        }
    }
}
</script>

<style lang="scss" scoped>
img{
    border-radius: 50%;
    object-fit: cover;
    height: 2.5rem;
    width: 2.5rem;
}
</style>