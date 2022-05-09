<template>
    <LoadingSpinner v-if="!loaded" />
    <div v-else class="container-fluid my-5 px-3 fade-in">
        <span class="text-success fs-3">Your Events</span>
        <div class="row px-5">
            <TowerEventCard v-for="u in userEvents" :key="u.id" :towerEvent="u" />
        </div>
            <span class="text-success fs-3 mt-5 pt-5">Upcoming Events</span>
        <div class="row flex-column">
            <div class="col-6 offset-3">
                <UserTicket v-for="u in userTickets" :key="u.id" :ticket="u" />
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Account',
  setup() {
    return {
        loaded: computed(() => AppState.towerEvents && AppState.userTickets),
        userEvents: computed(() => AppState.towerEvents?.filter(event => event.creatorId === AppState.account.id)),
        userTickets: computed(() => AppState.userTickets?.filter(ticket => ticket.event.isCanceled === false))
    }
  }
}
</script>

<style scoped>
</style>