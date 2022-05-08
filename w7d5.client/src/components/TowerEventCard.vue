<template>
    <div class="col-12 col-lg-6 col-xl-4 col-xxl-3 px-3 my-2 bg-dark d-flex">
        <div class="card bg-dark lighten-20 text-white p-1 action towerevent-card shadow" :title="`Go to event page for ${towerEvent.name}`" :aria-label="`Go to event page for ${towerEvent.name}`">
            <router-link :to="{ name: 'TowerEvent', params: { id: towerEvent.id }}">
                <img :src="towerEvent.coverImg" class="card-img" alt="No Image Provided">
                <div class="card-img-overlay d-flex flex-column justify-content-end p-1">
                    <div class="towerevent-card-details p-1 d-flex flex-column">
                        <span class="card-title my-0 fw-bold">{{towerEvent.name}}</span>
                        <span class="card-text">{{towerEvent.location}}</span>
                        <span class="card-text">{{towerEvent.dateString}}</span>
                        <span v-if="towerEvent.isCanceled" class="rounded bg-danger text-dark w-100 text-center fw-bolder pb-1 mt-1 fs-4">Event cancelled</span>
                        <span v-else-if="towerEvent.capacity <= 0" class="rounded bg-danger text-dark w-100 text-center fw-bolder pb-1 mt-1 fs-4">At Capacity</span>
                        <span v-else class="card-text align-self-end fs-4 mt-2"><span class="text-primary fw-bold">{{towerEvent.capacity}}</span> spot<span v-if="towerEvent.capacity != 1">s</span> left</span>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default
{
    props:
    {
        towerEvent:
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
    height: 18rem;
    width: 100%;
}
.card-img
{
    height: 100%;
    object-fit: cover;
}

.towerevent-card-details
{
    background-color: hsla(192, 00%, 0%, 0.5);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
}

a
{
    height: 100%;
    width: 100%;
    color: unset;
}
</style>