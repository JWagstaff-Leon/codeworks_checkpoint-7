<template>
    <div class="d-flex py-3">
        <img :src="comment.creator.picture" :alt="'profile picture of ' + comment.creator.name" class="rounded-circle me-2 shadow" />
        <div class="d-flex flex-column bg-dark lighten-50 p-2 rounded-2 shadow">
            <span class="text-black">{{comment.creator.name}}</span>
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
    height: 5rem;
    width: 5rem;
}
</style>