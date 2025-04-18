<script setup>
import { useRoute } from 'vue-router'
import { getMockRouteById } from '@/composables/useMockRoutes'

const route = useRoute()
const routeData = getMockRouteById(route.params.id)

</script>
<template>
  <div class="max-w-4xl mx-auto px-4 py-6">
    <h1 v-if="routeData" class="text-3xl font-bold mb-4">Details voor {{ routeData.name }}</h1>

    <div v-if="routeData">
      <p class="mb-2"><strong>Bezorgwagen:</strong> {{ routeData.vehicle }}</p>
      <p class="mb-4"><strong>Datum:</strong> {{ new Date(routeData.date).toLocaleDateString() }}</p>

      <h2 class="text-2xl font-semibold mt-6 mb-2">Adressen</h2>
      <ul class="space-y-2">
        <li
            v-for="(address, index) in routeData.addresses"
            :key="index"
            class="p-3 bg-gray-100 rounded-md shadow-sm"
        >
          <p><strong>Straat:</strong> {{ address.straat }} {{ address.nummer }}</p>
          <p><strong>Postcode:</strong> {{ address.postcode }}</p>
          <p><strong>Plaats:</strong> {{ address.woonplaats }}</p>
        </li>
      </ul>
    </div>

    <div v-else>
      <p class="text-red-500">Route niet gevonden.</p>
    </div>
  </div>
</template>