<template>
  <div class="max-w-screen-2xl mx-auto px-4">
    <h1 class="text-2xl mb-4">DBSCAN met Outlier Prioriteit</h1>
    <div class="mb-4">
      <button @click="runDBSCAN" class="bg-blue-500 text-white px-4 py-2 rounded">Start DBSCAN Loop</button>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ClusterPlot :points="scaledPoints" :labels="labels" />
      <ClusterMap :points="scaledPoints" :labels="labels" />
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import clustering from 'density-clustering'
  import ClusterMap from '/components/ClusterMap.vue'
  import ClusterPlot from '/components/ClusterPlot.vue'

  const labels = ref([])
  const scaledPoints = ref([])
  const depot = { lat: 52.3778, lon: 4.8952 }
  const points = [
    { lat: 52.3778, lon: 4.8952, priority: 1 }, // Depot
    { lat: 52.3710, lon: 4.8960, priority: 1 }, //  Dichtbij depot
    { lat: 52.3690, lon: 4.8940, priority: 1 }, //  Dichtbij depot
    { lat: 50.8546, lon: 5.6678, priority: 1 }  // Maastricht outlier
  ]

  const outlierIndex = 3;
  const maxPriority = 100000000;

  onMounted(() => {
    scaledPoints.value = points.map(p => ({lat: p.lat, lon: p.lon, clusterId: -1}));
    labels.value = new Array(points.length).fill(-1)
  })

  function scaleLatLonTowardsDepot(data) {
    const alpha = 0.25;
    return data.map(p => {
      const factor = Math.exp(-alpha * p.priority)
      return [
        p.lat * factor + depot.lat * (1 - factor),
        p.lon * factor + depot.lon * (1 - factor)
      ]
    })
  }

  function runDBSCAN() {
    let step = 0

    const loop = async () => {
      while (points[outlierIndex].priority < maxPriority) {
        const scaled = scaleLatLonTowardsDepot(points)

        const dbscan = new clustering.DBSCAN()
        const clusters = dbscan.run(scaled, 0.3, 2)

        const tempLabels = new Array(points.length).fill(-1)
        clusters.forEach((cluster, i) => {
          cluster.forEach(idx => {
            tempLabels[idx] = i
          })
        })

        scaledPoints.value = scaled.map((coords, i) => ({
          lat: coords[0],
          lon: coords[1],
          clusterId: tempLabels[i]
        }))

        if (scaledPoints.value[outlierIndex].clusterId !== -1) break

        points[outlierIndex].priority += 1
        await new Promise(resolve => setTimeout(resolve, 1000))
        step++
      }
    }
    loop()
  }
</script>