<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <h1 class="text-5xl font-bold text-blue-600 mb-2">VintaGo</h1>

    <p class="text-xl text-gray-600 italic">Take a seat</p>
    <div class="space-y-4 mt-4">
      <NuxtLink
          to="/routes"
          class="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
      >
        Ga naar de Planning
      </NuxtLink>
      <NuxtLink
          to="/orders"
          class="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
      >
        Ga naar de Orders
      </NuxtLink>
      <NuxtLink
          to="/simulation"
          class="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
      >
        Simulatie omgeving opzetten
      </NuxtLink>
    </div>
  </div>
</template>