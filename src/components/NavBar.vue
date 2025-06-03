<template>
  <header class="bg-pink-100 rounded-b-">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

      <!-- Logo -->
      <router-link to="/" class="text-3xl font-bold text-pink-500 tracking-tight">ECOMMERCE</router-link>

      <!-- Menu central -->
<nav class="hidden md:flex space-x-8 text-sm font-semibold text-gray-700">
  <router-link to="/" class="hover:text-black transition">ALL</router-link>
  <router-link to="/category/mobile-accessories" class="hover:text-black transition">MOBILE</router-link>
  <router-link to="/category/home-decoration" class="hover:text-black transition">DECORATION</router-link>
  <router-link to="/category/groceries" class="hover:text-black transition">GROCERIES</router-link>
  <router-link to="/category/fragrances" class="hover:text-black transition">FRAGRANCES</router-link>
</nav>


      <!-- Campo de busca + ícones -->
      <div class="flex items-center space-x-4">
        <!-- Campo de busca -->
        <div v-if="showSearchBar" class="hidden lg:flex items-center bg-gray-100 rounded-full px-3 py-1 w-64">
          <input
            v-model="searchQuery"
            @input="handleSearch"
            type="text"
            placeholder="Procurar..."
            class="bg-transparent outline-none text-sm text-gray-700 flex-1"
          />
          <button class="text-pink-500 hover:text-pink-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.48l4.82 4.82a1 1 0 01-1.42 1.42l-4.82-4.82A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>

        <!-- Carrinho -->
        <router-link to="/cart" class="relative text-black hover:text-pink-800 transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 2.3c-.6.6-.2 1.7.7 1.7H17m0 0a2 2 0 100 4 2 2 0 000-4m-8 2a2 2 0 11-4 0 2 2 0 014 0" />
          </svg>
          <span
            v-if="totalItems > 0"
            class="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
          >
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
