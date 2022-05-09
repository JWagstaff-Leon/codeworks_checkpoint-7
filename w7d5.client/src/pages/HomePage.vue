<template>
    <LoadingSpinner v-if="!towerEvents" />
    <div v-else>
        <div class="flex-grow-1 d-flex flex-column align-items-center bg-dark fade-in">
        <ul class="nav nav-tabs mt-4 mb-3 border-danger no-select no-drag">
            <li class="nav-item rounded-top action" @click="tab = ''" :class="{active: tab === '', 'border-danger': tab !== '', 'border-info': tab === '', 'bg-info': tab === ''}">
                <span class="nav-link" :class="{'text-dark': tab === '', 'text-primary': tab !== ''}">All</span>
            </li>
            <li class="nav-item rounded-top action" @click="tab = 'concert'" :class="{active: tab === 'concert', 'border-danger': tab !== 'concert', 'border-info': tab === 'concert', 'bg-info': tab === 'concert'}">
                <span class="nav-link" :class="{'text-dark': tab === 'concert', 'text-primary': tab !== 'concert'}">Concerts</span>
            </li>
            <li class="nav-item rounded-top action" @click="tab = 'convention'" :class="{active: tab === 'convention', 'border-danger': tab !== 'convention', 'border-info': tab === 'convention', 'bg-info': tab === 'convention'}">
                <span class="nav-link" :class="{'text-dark': tab === 'convention', 'text-primary': tab !== 'convention'}">Conventions</span>
            </li>
            <li class="nav-item rounded-top action" @click="tab = 'sport'" :class="{active: tab === 'sport', 'border-danger': tab !== 'sport', 'border-info': tab === 'sport', 'bg-info': tab === 'sport'}">
                <span class="nav-link" :class="{'text-dark': tab === 'sport', 'text-primary': tab !== 'sport'}">Sport Events</span>
            </li>
            <li class="nav-item rounded-top action" @click="tab = 'digital'" :class="{active: tab === 'digital', 'border-danger': tab !== 'digital', 'border-info': tab === 'digital', 'bg-info': tab === 'digital'}">
                <span class="nav-link" :class="{'text-dark': tab === 'digital', 'text-primary': tab !== 'digital'}">Digital Events</span>
            </li>
        </ul>
            <div class="container">
                <div class="row">
                    <div v-if="towerEvents.length <= 0" class="col-12">
                        <span class="text-primary text-center fs-3">No Events Found</span>
                    </div>
                    <TowerEventCard v-for="t in towerEvents" :key="t.id" :towerEvent="t" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { AppState } from '../AppState.js'
export default {
  name: 'Home',
  setup()
    {
        const tab = ref('');
    
        return {
            tab,
            towerEvents: computed(() => AppState.towerEvents.filter(towerEvent => towerEvent.type.includes(tab.value)))
        }
    }
}
</script>

<style scoped lang="scss">
</style>
