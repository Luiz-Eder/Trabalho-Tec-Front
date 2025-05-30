<template>
  <header class="bg-gray-800 text-white shadow-lg">
    <div class="container mx-auto px-6 py-4 flex items-center justify-between">
      <router-link to="/" class="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span class="text-2xl font-bold">E-Store</span>
      </router-link>

      <div v-if="showSearchBar" class="flex-1 max-w-xl mx-8">
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            @input="handleSearch"
            placeholder="Buscar por produtos..."
            class="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      <div class="flex items-center space-x-6">
        <router-link to="/cart" class="relative text-gray-300 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span v-if="totalItems > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {{ totalItems }}
          </span>
        </router-link>

        </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useCartStore } from '../stores/cartStore';

const searchQuery = ref('');
const router = useRouter();
const route = useRoute();

const { totalItems } = useCartStore();

const handleSearch = () => {
  if (route.path === '/' || route.name === 'CategoryProducts') {
    router.replace({ query: { search: searchQuery.value.trim() || undefined, page: 1 } });
  } else {
    router.push({ path: '/', query: { search: searchQuery.value.trim() || undefined, page: 1 } });
  }
};

const showSearchBar = computed(() => {
  return route.path === '/' || route.name === 'CategoryProducts';
});
</script>