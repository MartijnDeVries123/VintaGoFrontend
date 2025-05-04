<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Simulated Annealing VRP Planning</h1>
    <div class="mb-4 space-y-4">
      <div>
        <label for="penalty" class="block mb-2">Penalty voor dropped orders:</label>
        <input id="penalty" v-model.number="penaltyDropped" type="number" class="p-2 border rounded w-32" />
      </div>
      <div>
        <label for="temperature" class="block mb-2">Starttemperatuur (T):</label>
        <input id="temperature" v-model.number="startTemperature" type="number" class="p-2 border rounded w-32" />
      </div>
      <div>
        <label for="alpha" class="block mb-2">Afkoelingsfactor (alpha):</label>
        <input id="alpha" v-model.number="coolingAlpha" type="number" step="0.001" class="p-2 border rounded w-32" />
      </div>
      <button @click="runSA" class="mt-4 px-4 py-2 bg-green-500 text-white rounded">Start Dagplanning</button>
    </div>
    <pre class="mt-4 bg-gray-100 p-4 rounded overflow-auto h-96">{{ output }}</pre>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const output = ref('')
const penaltyDropped = ref(200)
const startTemperature = ref(5000)
const coolingAlpha = ref(0.995)

// Parameters
const DEPOT = { lat: 52.370216, lng: 4.895168 }
const SPEED = 50 // km/h
const WORK_MINUTES = (17 - 8) * 60 * 0.95
const PENALTY_OVERTIME = 50

// Locaties
const points = [
  { id: 1, lat: 50.8, lng: 3.3 },
  { id: 2, lat: 50.855102, lng: 3.379592 },
  { id: 3, lat: 50.910204, lng: 3.459184 },
  { id: 4, lat: 50.965306, lng: 3.538776 },
  { id: 5, lat: 51.020408, lng: 3.618367 },
  { id: 6, lat: 51.07551, lng: 3.697959 },
  { id: 7, lat: 51.130612, lng: 3.777551 },
  { id: 8, lat: 51.185714, lng: 3.857143 },
  { id: 9, lat: 51.240816, lng: 3.936735 },
  { id: 10, lat: 51.295918, lng: 4.016327 },
  { id: 11, lat: 51.35102, lng: 4.095918 },
  { id: 12, lat: 51.406122, lng: 4.17551 },
  { id: 13, lat: 51.461224, lng: 4.255102 },
  { id: 14, lat: 51.516327, lng: 4.334694 },
  { id: 15, lat: 51.571429, lng: 4.414286 },
  { id: 16, lat: 51.626531, lng: 4.493878 },
  { id: 17, lat: 51.681633, lng: 4.573469 },
  { id: 18, lat: 51.736735, lng: 4.653061 },
  { id: 19, lat: 51.791837, lng: 4.732653 },
  { id: 20, lat: 51.846939, lng: 4.812245 },
  { id: 21, lat: 51.902041, lng: 4.891837 },
  { id: 22, lat: 51.957143, lng: 4.971429 },
  { id: 23, lat: 52.012245, lng: 5.05102 },
  { id: 24, lat: 52.067347, lng: 5.130612 },
  { id: 25, lat: 52.122449, lng: 5.210204 },
  { id: 26, lat: 52.177551, lng: 5.289796 },
  { id: 27, lat: 52.232653, lng: 5.369388 },
  { id: 28, lat: 52.287755, lng: 5.44898 },
  { id: 29, lat: 52.342857, lng: 5.528571 },
  { id: 30, lat: 52.397959, lng: 5.608163 },
  { id: 31, lat: 52.453061, lng: 5.687755 },
  { id: 32, lat: 52.508163, lng: 5.767347 },
  { id: 33, lat: 52.563265, lng: 5.846939 },
  { id: 34, lat: 52.618367, lng: 5.926531 },
  { id: 35, lat: 52.673469, lng: 6.006122 },
  { id: 36, lat: 52.728571, lng: 6.085714 },
  { id: 37, lat: 52.783673, lng: 6.165306 },
  { id: 38, lat: 52.838776, lng: 6.244898 },
  { id: 39, lat: 52.893878, lng: 6.32449 },
  { id: 40, lat: 52.94898, lng: 6.404082 },
  { id: 41, lat: 53.004082, lng: 6.483673 },
  { id: 42, lat: 53.059184, lng: 6.563265 },
  { id: 43, lat: 53.114286, lng: 6.642857 },
  { id: 44, lat: 53.169388, lng: 6.722449 },
  { id: 45, lat: 53.22449, lng: 6.802041 },
  { id: 46, lat: 53.279592, lng: 6.881633 },
  { id: 47, lat: 53.334694, lng: 6.961224 },
  { id: 48, lat: 53.389796, lng: 7.040816 },
  { id: 49, lat: 53.444898, lng: 7.120408 },
  { id: 50, lat: 53.5, lng: 7.2 }
]

function haversine(a, b) {
  const R = 6371
  const dLat = (b.lat - a.lat) * Math.PI / 180
  const dLng = (b.lng - a.lng) * Math.PI / 180
  const lat1 = a.lat * Math.PI / 180
  const lat2 = b.lat * Math.PI / 180
  const a1 = Math.sin(dLat/2)**2 + Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLng/2)**2
  return 2 * R * Math.asin(Math.sqrt(a1))
}

function routeTime(route) {
  let time = 0
  for (let i = 0; i < route.length - 1; i++) {
    time += (haversine(route[i], route[i+1]) / SPEED) * 60
  }
  return time
}


function cost([r1, r2, dropped]) {
  const t1 = routeTime([DEPOT, ...r1, DEPOT])
  const t2 = routeTime([DEPOT, ...r2, DEPOT])
  let penalty = 0
  if (t1 > WORK_MINUTES) penalty += (t1 - WORK_MINUTES) * PENALTY_OVERTIME
  if (t2 > WORK_MINUTES) penalty += (t2 - WORK_MINUTES) * PENALTY_OVERTIME
  penalty += dropped.length * penaltyDropped.value
  return t1 + t2 + penalty
}

function initialSolution() {
  return [[], [], [...points]]
}

function neighbor([r1, r2, dropped]) {
  r1 = [...r1]
  r2 = [...r2]
  dropped = [...dropped]
  const op = Math.random()
  if (op < 0.4 && dropped.length) {
    const pick = dropped.splice(Math.floor(Math.random()*dropped.length),1)[0]
    if (Math.random() < 0.5) r1.push(pick)
    else r2.push(pick)
  } else if (op < 0.7 && (r1.length || r2.length)) {
    const from = (r1.length && (!r2.length || Math.random()<0.5)) ? r1 : r2
    if (from.length) dropped.push(from.splice(Math.floor(Math.random()*from.length),1)[0])
  } else if (r1.length > 1 || r2.length > 1) {
    const route = (r1.length>1 && (!r2.length || Math.random()<0.5)) ? r1 : r2
    if (route.length > 1) {
      let i = Math.floor(Math.random()*route.length)
      let j = Math.floor(Math.random()*route.length)
      while (i === j) {
        j = Math.floor(Math.random()*route.length)
      }
      [route[i], route[j]] = [route[j], route[i]]
    }
  }
  return [r1, r2, dropped]
}

async function runSA() {
  let T = startTemperature.value
  const alpha = coolingAlpha.value
  let current = initialSolution()
  let best = current
  let bestCost = cost(current)

  while (T > 1) {
    const next = neighbor(current)
    const delta = cost(next) - cost(current)
    if (delta < 0 || Math.random() < Math.exp(-delta/T)) {
      current = next
    }
    const cCost = cost(current)
    if (cCost < bestCost) {
      best = current
      bestCost = cCost
    }
    T *= alpha
  }

  const [r1, r2, dropped] = best
  const t1 = routeTime([DEPOT, ...r1, DEPOT])
  const t2 = routeTime([DEPOT, ...r2, DEPOT])

  output.value = `Rit 1 (${r1.length} stops, ${t1.toFixed(1)} min): ${r1.map(p=>p.id).join('→')}
`+
      `Rit 2 (${r2.length} stops, ${t2.toFixed(1)} min): ${r2.map(p=>p.id).join('→')}
`+
      `Niet gereden (${dropped.length}): ${dropped.map(p=>p.id).join(', ')}
`+
      `Totale kosten: ${bestCost.toFixed(1)}`
}
</script>

<style scoped>
pre { font-family: monospace; }
</style>