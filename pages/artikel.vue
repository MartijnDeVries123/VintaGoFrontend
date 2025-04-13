<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-semibold text-center text-blue-600 mb-6">Artikelen</h1>

    <!-- Loading State -->
    <div v-if="loading" class="text-center text-xl text-gray-500">
      Laden...
    </div>

    <!-- Error State -->
    <div v-if="error" class="text-center text-xl text-red-500 mb-4">
      Er is iets mis gegaan bij het ophalen van de artikelen.
    </div>

    <div v-if="articles.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="artikel in articles" :key="artikel.id" class="bg-white shadow-xl rounded-lg p-6 transform transition-transform hover:scale-105 hover:shadow-2xl duration-300">
        <h2 class="text-3xl font-semibold text-gray-800 mb-4 hover:text-blue-600 transition-colors duration-300">{{ artikel.title }}</h2>
        <p class="text-gray-600 text-lg mt-2">{{ artikel.description }}</p>

        <!-- Nieuwe attributen met extra styling -->
        <div class="mt-6 space-y-3">
          <p class="text-gray-700 font-medium"><strong>Naam:</strong> <span class="text-gray-500">{{ artikel.naam }}</span></p>
          <p class="text-gray-700 font-medium"><strong>Status:</strong> <span class="text-gray-500">{{ artikel.status }}</span></p>
          <p class="text-gray-700 font-medium"><strong>Gewicht:</strong> <span class="text-gray-500">{{ artikel.gewicht }} kg</span></p>
          <p class="text-gray-700 font-medium"><strong>Grootte:</strong> <span class="text-gray-500">{{ artikel.grootte }} m3</span></p>
        </div>

        <div class="mt-6">
          <NuxtLink :to="`/artikel/${artikel.id}`" class="text-blue-500 hover:text-blue-700 font-semibold transition-colors duration-300">Lees meer</NuxtLink>
        </div>
      </div>
    </div>

    <!-- No Articles State -->
    <div v-if="!loading && articles.length === 0" class="text-center text-xl text-gray-500">
      Geen artikelen gevonden.
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
      loading: true,
      error: false,
    };
  },
  mounted() {
    this.fetchArticles();
  },
  methods: {
    async fetchArticles() {
      try {
        const response = await fetch('/api/artikel');
        if (!response.ok) {
          throw new Error('Netwerkfout');
        }
        this.articles = await response.json();
      } catch (err) {
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>