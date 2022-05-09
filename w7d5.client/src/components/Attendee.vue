<template>
    <div class="position-relative d-inline-block">
        <img :src="attendee.picture" @mouseenter="nameVisible = true; firstHovered = true" @mouseleave="nameVisible = false" :title="attendee.name" />
        <span :class="{'fade-in': nameVisible, 'fade-out': !nameVisible, 'visually-hidden': !firstHovered}" class="border-2 rounded-3 py-2 px-3 text-light bg-dark darken-10">{{attendee.name}}</span>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity';
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
        const nameVisible = ref(false);
        const firstHovered = ref(false);
        return {
            nameVisible,
            firstHovered
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
    left: -1rem;
}
</style>