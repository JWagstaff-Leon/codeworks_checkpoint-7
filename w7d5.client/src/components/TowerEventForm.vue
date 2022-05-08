<template>
    <form @submit.prevent="submitForm" class="d-flex flex-column">
        <div class="d-flex mb-3">
            <div class="me-1 flex-grow-1">
                <label>Event Name</label>
                <input type="text" class="form-control" placeholder="Tower Event Name" required />
            </div>
            <div class="ms-1">
                <label>Event Type</label>
                <select class="form-control">
                    <option value="concert">Concert</option>
                    <option value="convention">Convention</option>
                    <option value="sport">Sport</option>
                    <option value="digital">Digital</option>
                </select>
            </div>
        </div>
        <label>Cover Image URL</label>
        <input type="url" class="form-control mb-1" placeholder="Cover Image URL" required />
        <label>Description</label>
        <textarea class="form-control mb-3" placeholder="Description"></textarea>
        <div class="d-flex mb-2">
            <div class="me-1">
                <label>Event Location</label>
                <input type="text" class="form-control mb-3" placeholder="Location" required />
            </div>
            <div class="ms-1">
                <label>Max Capacity</label>
                <input type="number" class="form-control" placeholder="Max Capacity" min="0" required />
            </div>
        </div>
        <div class="d-flex mb-3">
            <div class="me-1">
                <label>Event Date</label>
                <input type="date" class="form-control" required />
            </div>
            <div>
                <label>Event Start Time</label>
                <div class="d-flex">
                    <label class="visually-hidden">Event Start Hour</label>
                    <input type="number" class="form-control" min="0" max="23" placeholder="HH" required />
                    <span class="fs-3 mx-2">:</span>
                    <label class="visually-hidden">Event Start Minute</label>
                    <input type="number" class="form-control" min="0" max="59" placeholder="MM" required />
                </div>
            </div>
        </div>
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