<template>
    <nav class="navbar navbar-expand-xl navbar-dark px-3 flex-xl-column">
        <router-link class="navbar-brand d-flex d-xl-none" :to="{ name: 'Home' }">
            <div class="d-flex flex-column align-items-center">
                <span class="fs-2">the t<img alt="logo" src="../assets/img/tower_logo.svg" height="30" />wer</span>
            </div>
        </router-link>
        <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon" />
        </button>
        <div class="collapse navbar-collapse flex-column" id="navbarText">
            <!-- <ul class="navbar-nav me-auto">
                <li>
                <router-link
                    :to="{ name: 'About' }"
                    class="btn text-success lighten-30 selectable text-uppercase"
                >
                    About
                </router-link>
                </li>
            </ul> -->
            <!-- LOGIN COMPONENT HERE -->
            <div class="dropdown my-2 my-lg-0">
            <div class="d-flex flex-row flex-xl-column justify-content-around align-items-center">
            <Login />
            <router-link :to="{ name: 'Home' }">
                <button class="btn text-info py-2">home</button>
            </router-link>

            <router-link v-if="signedIn" :to="{ name: 'Account' }">
                <button class="btn text-info py-2">Account</button>
            </router-link>
            </div>
            
            <div class="d-flex flex-row flex-xl-column">
                <button v-if="signedIn" class="btn btn-success mt-3 mt-xl-4 me-3 me-xl-0 flex-grow-1" data-bs-toggle="modal" data-bs-target="#create-event-modal">new event</button>
                <button v-if="signedIn" class="btn btn-dark mt-3 w-xl-100  ms-3 ms-xl-0 flex-grow-1" @click="logout">logout</button>
            </div>
            </div>
        </div>
    </nav>

    <Modal id="create-event-modal">
        <template #modal-title-slot>
            <h4>Create New Event</h4>
        </template>
        
        <template #modal-body-slot>
            <TowerEventForm />
        </template>
    </Modal>
</template>

<script>
import { computed } from '@vue/reactivity';
import { AuthService } from "../services/AuthService";
import { AppState } from '../AppState.js';
export default {
  setup() {
    return {
        signedIn: computed(() => AppState.account.id),
        async logout()
        {
            AuthService.logout({ returnTo: window.location.origin });
        }
    };
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.navbar
{
    /* FIXME fix this gradient not working */
    /* background: linear-gradient(to bottom, #474C61FF, #474C6100); */
    background-color: #474C61;
}
</style>
