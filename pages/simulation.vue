<template>
  <div class="p-8 max-w-md mx-auto space-y-6">
    <h1 class="text-xl font-bold">Selecteer Simulation Type</h1>

    <select
        v-model="selected"
        class="w-full border rounded p-2"
    >
      <option disabled value="">-- Kies een simulatie --</option>
      <option v-for="type in simulationTypes" :key="type" :value="type">
        {{ type }}
      </option>
    </select>

    <button
        @click="submit"
        :disabled="loading || !selected"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
    >
      Verstuur
    </button>

    <div v-if="success" class="flex items-center space-x-2 text-green-600">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
           viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M5 13l4 4L19 7"></path>
      </svg>
      <span>Succesvol geinitialiseerd</span>
    </div>

    <div v-if="error" class="text-red-500">
      Fout bij versturen: {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFetch } from '#app'

const simulationTypes = ["sim20", "sim20outlier", "sim100", "sim500"]
const selected = ref("")
const success = ref(false)
const error = ref("")
const loading = ref(false)

const submit = async () => {
  success.value = false
  error.value = ""
  loading.value = true

  try {
    const { error: fetchError } = await useFetch('/api/simulationtypes', {
      method: 'POST',
      body: { type: selected.value }
    })

    if (fetchError.value) {
      throw new Error(fetchError.value.message)
    }

    success.value = true
  } catch (err) {
    error.value = err.message || 'Onbekende fout'
  } finally {
    loading.value = false
  }
}
</script>