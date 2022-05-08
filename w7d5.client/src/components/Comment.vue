<template>
    <div class="d-flex">
        <img :src="comment.creator.picture" :alt="'profile picture of ' + comment.creator.name" class="rounded-circle me-2" />
        <div class="d-flex flex-column">
            <span class="text-dark">{{comment.crator.name}}</span>
            <p>{{comment.body}}</p>
        </div>
    </div>
</template>

<script>
export default
{
    props:
    {
        comment:
        {
            type: Object,
            require: true
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
img
{
    height: 6rem;
    width: 6rem;
}
</style>