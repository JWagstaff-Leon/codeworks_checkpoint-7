<template>
    <form @submit.prevent="submitForm">
        <label>Event Name</label>
        <input type="text" class="form-control" placeholder="Tower Event Name" required />
        <label>Description</label>
        <textarea class="form-control" placeholder="Description"></textarea>
        <label>Cover Image URL</label>
        <input type="url" class="form-control" placeholder="Cover Image URL" required />
        <label>Event Location</label>
        <input type="text" class="form-control" placeholder="Location" required />
        <label>Max Capacity</label>
        <input type="text" class="form-control" placeholder="Max Capacity" required />
        <label>Event Date</label>
        <input type="date" class="form-control" required />
        <label>Event Start Time</label>
        <label class="visually-hidden">Event Start Hour</label>
        <input type="number" class="form-control" min="0" max="23" value="0" required />
        <label class="visually-hidden">Event Start Minute</label>
        <input type="number" class="form-control" min="0" max="59" value="0" required />
        <select class="form-control">
        </select>
    </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core';
export default
{
    props:
    {
        towerEvent:
        {
            type: Object,
            default: {}
        }
    },

    setup(props)
    {
        const editable = ref({});

        onMounted(() =>
        {
            editable.value =  { ...props.towerEvent };
        });

        return {
            editable
        }
    }
}
</script>

<style lang="scss" scoped>
textarea
{
    resize: none;
}
</style>