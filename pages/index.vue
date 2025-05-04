<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <!-- Brand Name -->
    <h1 class="text-5xl font-bold text-blue-600 mb-2">VintaGo</h1>

    <!-- Slogan -->
    <p class="text-xl text-gray-600 italic">Take a seat</p>
    <div class="space-y-4 mt-4">
      <NuxtLink
          to="/routes"
          class="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
      >
        Ga naar de Planning
      </NuxtLink>
      <NuxtLink
          to="/artikel"
          class="px-6 py-2 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition duration-200"
      >
        Ga naar de Artikelpagina
      </NuxtLink>
      <NuxtLink
          to="/dbscan"
          class="px-6 py-2 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition duration-200"
      >
        DBscan test
      </NuxtLink>
      <NuxtLink
          to="/sa"
          class="px-6 py-2 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition duration-200"
      >
        Simmulated Annealing
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>

</style>