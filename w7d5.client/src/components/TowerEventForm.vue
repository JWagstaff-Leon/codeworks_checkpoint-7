<template>
    <form @submit.prevent="submitForm" class="d-flex flex-column">
        <div class="d-flex mb-3">
            <div class="me-1 flex-grow-1">
                <label>Event Name</label>
                <input type="text" class="form-control" placeholder="Tower Event Name" v-model="editable.name" required />
            </div>
            <div class="ms-1">
                <label>Event Type</label>
                <select class="form-control" v-model="editable.type" required>
                    <option value="concert">Concert</option>
                    <option value="convention">Convention</option>
                    <option value="sport">Sport</option>
                    <option value="digital">Digital</option>
                </select>
            </div>
        </div>
        <label>Cover Image URL</label>
        <input type="url" class="form-control mb-1" placeholder="Cover Image URL" v-model="editable.coverImg" required />
        <label>Description</label>
        <textarea class="form-control mb-3" placeholder="Description" v-model="editable.description" required></textarea>
        <div class="d-flex mb-2">
            <div class="me-1">
                <label>Event Location</label>
                <input type="text" class="form-control mb-3" placeholder="Location" v-model="editable.location" required />
            </div>
            <div class="ms-1">
                <label>Capacity</label>
                <input type="number" class="form-control" placeholder="Capacity" min="0" v-model="editable.capacity" required />
            </div>
        </div>
        <div class="d-flex mb-5">
            <div class="me-1">
                <label>Event Date</label>
                <input type="date" class="form-control" v-model="editable.date" required />
            </div>
            <div>
                <label>Event Start Time</label>
                <div class="d-flex">
                    <label class="visually-hidden">Event Start Hour</label>
                    <input type="number" class="form-control" min="0" max="23" placeholder="HH" v-model="editable.hour" required />
                    <span class="fs-3 mx-2">:</span>
                    <label class="visually-hidden">Event Start Minute</label>
                    <input type="number" class="form-control" min="0" max="59" placeholder="MM" v-model="editable.minute" required />
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-end">
            <button class="btn btn-outline-danger" type="button" data-bs-dismiss="modal">Cancel</button>
            <button class="btn btn-primary ms-3" type="submit">Create Event</button>
        </div>
    </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { onMounted, watchEffect } from '@vue/runtime-core';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
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
            editable.value = { ...props.towerEvent };
            if(props.towerEvent.startDate)
            {
                editable.value.date = props.towerEvent.startDate.toLocaleDateString();
                editable.value.day = p_date.getDate();
                editable.value.month = p_date.getMonth() + 1;
                editable.value.year = p_date.getFullYear();
                editable.value.hour = p_date.getHours();
                editable.value.minute = p_date.getMinutes();
            }
        });

        return {
            editable,
            async submitForm()
            {
                try
                {
                    
                }
                catch(error)
                {
                    logger.error("[TowerEventForm.vue > submitForm]", error.message);
                    Pop.toast(error.message, "error");
                }
            }
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