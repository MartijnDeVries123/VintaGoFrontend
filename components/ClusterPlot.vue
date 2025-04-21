<template>
  <div id="plot" class="h-[400px] w-full"></div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
let Plotly = null

const props = defineProps({
  points: Array,
  labels: Array,
})

onMounted(async () => {
  Plotly = await import('plotly.js-dist-min').then(m => m.default)
  plotClusters()
})

watch(() => [props.points, props.labels], () => {
  plotClusters()
}, { deep: true })

function plotClusters() {
  if (!Plotly || !props.points) return

  const clusterColors = [
    '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
    '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
  ]

  const trace = {
    x: props.points.map(p => p[0]),
    y: props.points.map(p => p[1]),
    mode: 'markers',
    marker: {
      size: 8,
      color: props.labels.map(l => l >= 0 ? clusterColors[l % clusterColors.length] : '#aaaaaa')
    },
    type: 'scatter'
  }

  Plotly.newPlot('plot', [trace], {
    margin: { l: 65, r: 25, b: 50, t: 0 },
    xaxis: {
      title: {
        text: 'Latitude'
      },
    },
    yaxis: {
      title: {
        text: 'Longitude'
      }
    }
  })
}
</script>