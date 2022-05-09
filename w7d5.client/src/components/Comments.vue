<template>
    <div class="d-flex flex-column">
        <span class="text-dark lighten-60 mb-1 fs-5">What people are saying</span>
        <div class="bg-dark lighten-20 py-3 px-5">
            <CreateComment v-if="signedIn" />
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