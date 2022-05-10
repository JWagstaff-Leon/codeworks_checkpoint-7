<template>
    <div class="d-flex flex-column mb-5">
        <span class="text-dark lighten-60 mb-1 fs-5 no-select">What people are saying</span>
        <div class="bg-dark lighten-20 py-3 px-3 px-lg-5 rounded">
            <CreateComment v-if="signedIn" />
            <div v-if="comments.length <= 0" class="d-flex flex-column align-items-center mx-auto">
                <span  class="text-success darken-20 fs-2 fw-light fst-italic">No Comments Yet</span>
            </div>
            <Comment v-for="c in comments" :key="c.id" :comment="c" />
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState.js'
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
            signedIn: computed(() => AppState.user.isAuthenticated)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>