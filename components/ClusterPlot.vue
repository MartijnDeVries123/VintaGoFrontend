<template>
  <div id="plot" class="h-[600px] w-full"></div>
</template>

<script setup>
import {  watch } from 'vue'
import Plotly from 'plotly.js-dist-min'

const props = defineProps({
  points: Array,
  labels: Array,
})

watch(() => [props.points, props.labels], () => {
  plotClusters()
}, { deep: true })

function plotClusters() {
  const clusterColors = [
    '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
    '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
  ]

  const trace = {
    x: props.points.map(p => p.lat),
    y: props.points.map(p => p.lon),
    mode: 'markers',
    marker: {
      size: 8,
      color: props.points.map(p => p.clusterId >= 0 ? clusterColors[p.clusterId % clusterColors.length] : '#aaaaaa')
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