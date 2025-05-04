<template>
  <l-map
      ref="mapRef"
      @ready="onMapReady"
      style="height: 600px; width: 100%"
      :zoom="7"
      :center="[52.09, 5.12]"
  >
    <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <l-circle-marker
        v-for="(p, idx) in points"
        :key="idx"
        :lat-lng="[p.lat, p.lon]"
        :radius="8"
        :color="getColor(p.clusterId)"
    />
  </l-map>
</template>

<script setup>
import { ref } from 'vue'
import { LMap, LTileLayer, LCircleMarker } from '@vue-leaflet/vue-leaflet'

const props = defineProps({
  points: Array,
})

const mapRef = ref(null)
const mapReady = ref(false)

function onMapReady(map) {
  mapRef.value = map
  mapReady.value = true
}

const getColor = (label) => {
  const clusterColors = [
    '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728',
    '#9467bd', '#8c564b', '#e377c2', '#7f7f7f',
    '#bcbd22', '#17becf'
  ]
  return label >= 0 ? clusterColors[label % clusterColors.length] : '#000000'
}
</script>