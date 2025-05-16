<template>
  <div class="max-w-7xl mx-auto px-4 py-6">
    <!--    Dashboard -->
    <div class="mt-8 flex justify-between">
      <NuxtLink to="/" class="text-blue-600 hover:underline">
        ← Terug naar dashboard
      </NuxtLink>
    </div>

    <h1 class="text-3xl font-bold mb-6">Bestellingen</h1>

    <!-- Sorteerknop -->
    <div class="mb-4">
      <button @click="toggleSort" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Sorteer op status ({{ sortAscending ? 'A-Z' : 'Z-A' }})
      </button>
    </div>

    <!-- Tabel -->
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
        <tr class="bg-gray-100">
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="order in paginatedOrders"
            :key="order.id"
            :class="getRowClass(order.status)"
            class="hover:bg-gray-50"
        >
          <td class="px-6 py-4 text-sm text-gray-700">{{ order.id }}</td>
          <td class="px-6 py-4 text-sm text-gray-700">{{ translateStatus(order.status) }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Geen resultaten -->
    <div v-if="paginatedOrders.length === 0" class="mt-4 text-gray-500">
      Geen orders gevonden.
    </div>

    <!-- Paginering -->
    <div class="mt-4 flex justify-between items-center">
      <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
      >
        Vorige
      </button>
      <span class="text-sm text-gray-700">
        Pagina {{ currentPage }} van {{ totalPages }}
      </span>
      <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
      >
        Volgende
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentPage = ref(1)
const itemsPerPage = 10

const { data } = await useFetch('/api/orders')
const orders = computed(() => data.value ?? [])

const statusTranslations = {
  Unfulfilled: 'Nog niet ingepland',
  pending: 'Onderweg',
}

const translateStatus = (status) => statusTranslations[status] || status

const sortAscending = ref(true)
const toggleSort = () => {
  sortAscending.value = !sortAscending.value
}

// Gesorteerde orders
const sortedOrders = computed(() => {
  return [...orders.value].sort((a, b) => {
    const statusA = translateStatus(a.status).toLowerCase()
    const statusB = translateStatus(b.status).toLowerCase()
    return sortAscending.value
        ? statusA.localeCompare(statusB)
        : statusB.localeCompare(statusA)
  })
})

// Paginering
const totalPages = computed(() => Math.ceil(sortedOrders.value.length / itemsPerPage))

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return sortedOrders.value.slice(start, start + itemsPerPage)
})

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

// Gele achtergrond voor "Onderweg"
const getRowClass = (status) => {
  return status === 'pending' ? 'bg-yellow-100' : ''
}
</script>

<style scoped>
button:disabled {
  cursor: not-allowed;
}
</style>
