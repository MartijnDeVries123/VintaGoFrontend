<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getMockRouteById } from '@/composables/useMockRoutes'
import L from 'leaflet'
import 'leaflet-routing-machine'

const route = useRoute()
const routeData = getMockRouteById(route.params.id)
const addresses = routeData.addresses;

const mapElement = ref(null)
let map = null
let control = null
let routeIndex = ref(-1);

onMounted(() => {
  if (!routeData || !mapElement.value) return

  map = L.map(mapElement.value).setView([addresses[0].lat, addresses[0].lng], 10)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)
})
function showNextRoute() {
  routeIndex.value += 1;
  const from = addresses[routeIndex.value]
  const to = addresses[routeIndex.value + 1]
  if (!from || !to) return

  if (control) {
    map.removeControl(control)
  }

  control = L.Routing.control({
    waypoints: [
      L.latLng(from.lat, from.lng),
      L.latLng(to.lat, to.lng)
    ],
    routeWhileDragging: false,
    show: false,
    addWaypoints: false,
    draggableWaypoints: false,
  }).addTo(map)
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Linkerkant -->
    <div>
      <h1 v-if="routeData" class="text-3xl font-bold mb-4">Details voor {{ routeData.name }}</h1>

      <div v-if="routeData">
        <p class="mb-2"><strong>Bezorgwagen:</strong> {{ routeData.vehicle }}</p>
        <p class="mb-4"><strong>Datum:</strong> {{ new Date(routeData.date).toLocaleDateString() }}</p>

        <h2 class="text-2xl font-semibold mt-6 mb-2">Adressen</h2>
        <ul class="space-y-4 max-h-[300px] overflow-y-auto pr-2">
          <li
              v-for="(address, index) in routeData.addresses"
              :key="index"
              class="p-4 bg-gray-100 rounded-md shadow-sm"
          >
            <p><strong>Straat:</strong> {{ address.straat }} {{ address.nummer }}</p>
            <p><strong>Postcode:</strong> {{ address.postcode }}</p>
            <p><strong>Plaats:</strong> {{ address.woonplaats }}</p>
          </li>
        </ul>
      </div>

      <div v-else>
        <p class="text-red-500">Route niet gevonden.</p>
      </div>
    </div>

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
          v-else-if="routeIndex < routeData.addresses.length - 2"
          @click="showNextRoute()"
          class="self-start px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
      >
        Toon route naar volgend adres
      </button>
    </div>
  </div>
</template>