<template>
  <div id="map" style="height: 500px;"></div>
</template>

<script setup>
import L from 'leaflet'
import 'leaflet-routing-machine'

onMounted(() => {
  const map = L.map('map').setView([52.379189, 4.899431], 10)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)

  L.Routing.control({
    waypoints: [
      L.latLng(52.379189, 4.899431), // Amsterdam
      L.latLng(52.090737, 5.12142),  // Utrecht
      L.latLng(51.92442, 4.477733)   // Rotterdam
    ],
    routeWhileDragging: true,
  }).addTo(map)
})
</script>