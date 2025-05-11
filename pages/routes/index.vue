<template>
  <div class="max-w-7xl mx-auto px-4 py-6">
    <!-- Navigatie -->
    <div class="mt-8 flex justify-between">
      <NuxtLink to="/" class="text-blue-600 hover:underline">
        ← Terug naar dashboard
      </NuxtLink>
      <NuxtLink to="/routes/create" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        + Nieuwe routeplanning maken
      </NuxtLink>
    </div>
    <h1 class="text-3xl font-bold mb-6">Routeplanning voor Bezorging</h1>

    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
        <tr class="bg-gray-100">
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Route</th>
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Bezorgwagen</th>
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Datum</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(route, index) in paginatedRoutes" :key="index" class="hover:bg-gray-50">
          <td class="px-6 py-4 text-sm text-gray-700">
            <NuxtLink :to="`/routes/${route.id}`" class="text-blue-600 underline">
              Bekijk details van route: #{{ route.id }}
            </NuxtLink>
          </td>
          <td class="px-6 py-4 text-sm text-gray-700">{{ route.deliveryTruckName }}</td>
          <td class="px-6 py-4 text-sm text-gray-700">{{ formatDate(route.deliveryDate) }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Paginering -->
    <div class="mt-4 flex justify-between items-center">
      <button @click="previousPage" :disabled="currentPage === 1" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300">
        Vorige
      </button>
      <span class="text-sm text-gray-700">
        Pagina {{ currentPage }} van {{ totalPages }}
      </span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300">
        Volgende
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentPage = ref(1)
const itemsPerPage = 15

const { data, pending, error } = await useFetch('/api/routes-schedule')
const routes = computed(() => data.value ?? [])

const totalPages = computed(() => Math.ceil(routes.value.length / itemsPerPage))

const paginatedRoutes = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return routes.value.slice(start, end)
})

const formatDate = (date) => {
  const d = new Date(date)
  return d.toLocaleDateString('nl-NL')
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
</script>

<style scoped>
button:disabled {
  cursor: not-allowed;
}
</style>