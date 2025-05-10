<template>
  <div class="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div>
      <NuxtLink to="/routes" class="inline-block mb-4 text-blue-600 hover:underline">&larr; Terug naar overzicht</NuxtLink>
      <h1 class="text-3xl font-bold mb-4">Details voor Route #{{ routeData.id }}</h1>

      <div v-if="routeData">
        <p class="mb-2"><strong>Bezorgwagen:</strong> {{ routeData.deliveryTruckName }}</p>
        <p class="mb-4"><strong>Datum:</strong> {{ new Date(routeData.deliveryDate).toLocaleDateString('nl-NL') }}</p>

        <h2 class="text-2xl font-semibold mt-6 mb-2">Adressen</h2>
        <ul ref="addressList" class="space-y-4 max-h-[300px] overflow-y-auto pr-2">
          <li
              v-for="(step, index) in sortedSteps"
              :key="index"
              :ref="el => addressRefs[index] = el"
              :class="[
                'p-4 rounded-md shadow-sm transition-all duration-300',
                step.address.id === DEPOT.id ? 'bg-yellow-200' : '',
                 index === routeIndex + 1 ? 'bg-blue-100 ring-2 ring-blue-400' : 'bg-gray-100'
              ]"
          >
            <p>{{ step.address.street }} {{ step.address.number }}</p>
            <p>{{ step.address.zip }} {{ step.address.city }}</p>
          </li>
        </ul>
      </div>

      <div v-else>
        <p class="text-red-500">Route niet gevonden.</p>
      </div>
    </div>

    <!-- Kaart en knoppen -->
    <div class="flex flex-col gap-4">
      <div class="w-full h-[500px] rounded shadow-md border" ref="mapElement" />
      <button
          v-if="routeIndex === -1"
          @click="showNextRoute()"
          class="self-start px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
      >
        Route starten
      </button>
      <button
          v-else-if="routeIndex < sortedSteps.length - 2"
          @click="showNextRoute()"
          class="self-start px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
      >
        Volgende stop tonen
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useFetch } from '#app'
import L from 'leaflet'
import 'leaflet-routing-machine'
import { DEPOT } from "~/composables/useDepot.js";

const route = useRoute()
const routeId = route.params.id

const { data: data } = await useFetch(`/api/routes-schedule/${routeId}`)
const routeData = computed(() => {
  return (data.value ?? {})
})

const sortedSteps = computed(() => {
  const steps = (routeData.value.addresses ?? []).slice().sort((a, b) => a.stepOrder - b.stepOrder)
  return [
    { address: DEPOT },
    ...steps,
    { address: DEPOT }
  ]
})

const addresses = computed(() => sortedSteps.value.map(a => a.address))

const mapElement = ref(null)
const addressList = ref(null)
const addressRefs = []
let map = null
let control = null
let routeIndex = ref(-1)

onMounted(() => {
  if (!mapElement.value || addresses.value.length === 0) return

  if (map) map.remove()

  map = L.map(mapElement.value).setView([
    addresses.value[0].location.lat,
    addresses.value[0].location.lng
  ], 10)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)

  // Toon volledige route direct bij opstarten
  control = L.Routing.control({
    waypoints: addresses.value.map(addr => L.latLng(addr.location.lat, addr.location.lng)),
    routeWhileDragging: false,
    show: false,
    addWaypoints: false,
    draggableWaypoints: false,
  }).addTo(map)
})

function showNextRoute() {
  routeIndex.value += 1
  const from = addresses.value[routeIndex.value]
  const to = addresses.value[routeIndex.value + 1]
  if (!from || !to) return

  if (control) {
    map.removeControl(control)
  }

  control = L.Routing.control({
    waypoints: [
      L.latLng(from.location.lat, from.location.lng),
      L.latLng(to.location.lat, to.location.lng)
    ],
    routeWhileDragging: false,
    show: false,
    addWaypoints: false,
    draggableWaypoints: false,
  }).addTo(map)

  nextTick(() => {
    const el = addressRefs[routeIndex.value]
    if (el && addressList.value) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  })
}
</script>
