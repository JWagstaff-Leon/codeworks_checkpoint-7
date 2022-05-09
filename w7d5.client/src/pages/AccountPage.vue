<template>
    <LoadingSpinner v-if="!loaded" />
    <div v-else class="flex-grow-1 d-flex flex-column align-items-center bg-dark fade-in">
        <div class="container my-5 px-3">
            <div class="d-flex flex-column">
                <span class="text-success fs-3">Your Events</span>
                <span v-if="userEvents.length <= 0" class="text-primary fs-2 px-xl-5">You have not made any events.</span>
            </div>
            <div class="row px-xl-5">
                <TowerEventCard v-for="u in userEvents" :key="u.id" :towerEvent="u" />
            </div>
                <span class="text-success fs-3 mt-5 pt-5">Upcoming Events</span>
            <div class="row flex-column">
                <span v-if="userTickets.length <= 0" class="text-primary fs-2 px-xl-5">You are not registered for any upcoming events.</span>
                <div v-else class="col-12 col-xl-8 offset-0 offset-xl-2">
                    <UserTicket v-for="u in userTickets" :key="u.id" :ticket="u" />
                </div>
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