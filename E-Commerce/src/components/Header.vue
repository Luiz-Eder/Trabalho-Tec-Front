<template>
  <header class="bg-white shadow-md">
    <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
      <router-link to="/" class="text-2xl font-bold text-gray-800">E-Store</router-link>
      <div class="flex items-center space-x-4">
        <input
          type="text"
          v-model="searchQuery"
          @input="handleSearch"
          placeholder="Buscar produtos..."
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div class="relative">
          <button @click="toggleMenu" class="text-gray-600 hover:text-gray-800">Categorias</button>
          <div v-if="isMenuOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
            <router-link
              v-for="category in categories"
              :key="category"
              :to="`/category/${category}`"
              @click="isMenuOpen = false"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {{ category }}
            </router-link>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const searchQuery = ref('');
const categories = ref([]);
const isMenuOpen = ref(false);
const router = useRouter();

const fetchCategories = async () => {
  try {
    const response = await axios.get('/products/categories');
    categories.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
  }
};

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/', query: { search: searchQuery.value.trim() } });
  } else {
    router.push({ path: '/' });
  }
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

onMounted(fetchCategories);
</script>