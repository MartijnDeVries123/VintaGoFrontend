<template>
  <div class="p-8 max-w-xl mx-auto space-y-6">
    <NuxtLink to="/routes" class="inline-block mb-4 text-blue-600 hover:underline">&larr; Terug naar overzicht</NuxtLink>
    <h1 class="text-2xl font-bold">Genereer Routeplanning</h1>

    <div class="space-y-4">
      <div>
        <label class="font-medium">Algoritme:</label>
        <select v-model="selectedAlgorithm" class="w-full p-2 border rounded">
          <option v-for="algo in algorithms" :key="algo.postVal" :value="algo.postVal">{{ algo.name }}</option>
        </select>
      </div>

      <div>
        <label class="font-medium">Simulatie:</label>
        <select v-model="selectedSimulation" class="w-full p-2 border rounded">
          <option v-for="sim in simulations" :key="sim.postVal" :value="sim.postVal">{{ sim.name }}</option>
        </select>
      </div>

      <div>
        <label class="font-medium">Planning:</label>
        <select v-model="selectedPlanning" class="w-full p-2 border rounded">
          <option v-for="type in planningTypes" :key="type.postVal" :value="type.postVal">{{ type.name }}</option>
        </select>
      </div>

      <button @click="generateRouteSchedule" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded" :disabled="isLoading">
        {{ isLoading ? 'Bezig met genereren...' : 'Genereer' }}
      </button>

      <div v-if="result" class="mt-6">
        <NuxtLink
            to="/routes"
            class="inline-block px-4 py-2 bg-green-600 text-white font-semibold rounded shadow hover:bg-green-700 transition"
        >
          📋 Planning bekijken
        </NuxtLink>
      </div>
    </div>
  </div>
</template>>

<script setup>
import { ref } from 'vue'

const algorithms = {
  bruteforce: {
    name: 'Brute Force',
    postVal: 'bf'
  },
  ortools: {
    'name': 'OR-Tools',
    'postVal': 'ortools'
  },
  linkeringhan: {
    'name': 'Lin-Kerninghan',
    'postVal': 'lk'
  },
  genetic: {
    'name': 'Genetic Algorithm',
    'postVal': 'ga'
  },
}

const simulations = {
  sim20: {
    name: 'Simulatie 20',
    postVal: 'sim20'
  },
  sim20outlier: {
    name: 'Simulatie 20 met outlier',
    postVal: 'sim20outlier'
  },
  sim100: {
    name: 'Simulatie 100',
    postVal: 'sim100'
  },
  sim500: {
    name: 'Simulatie 500',
    postVal: 'sim500'
  }
}

const planningTypes = {
  dagplanning: {
    name: 'Dagplanning',
    postVal: 'day'
  },
  weekplanning: {
    name: 'Weekplanning',
    postVal: 'week'
  }
}

const selectedAlgorithm = ref(algorithms[0])
const selectedSimulation = ref(simulations[0])
const selectedPlanning = ref(planningTypes[0])

const isLoading = ref(false)
const result = ref(null)

const generateRouteSchedule = async () => {
  isLoading.value = true
  result.value = null

  try {
    const response = await $fetch('/api/routes-schedule/create-schedule', {
      method: 'POST',
      body: {
        solver: selectedAlgorithm.value,
        simulationType: selectedSimulation.value,
        days: selectedPlanning.value,
      },
    })
    result.value = response
  } catch (err) {
    result.value = { error: 'Fout bij genereren van routeplanning' }
  } finally {
    isLoading.value = false
  }
}
</script>
