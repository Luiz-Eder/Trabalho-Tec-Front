<template>
  <div class="container mx-auto px-6 py-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">Nossos Produtos</h1>

    <div v-if="currentCategory || searchQuery" class="mb-6 text-center">
      <p v-if="currentCategory" class="text-xl text-gray-600">
        Exibindo produtos em: <span class="font-semibold capitalize">{{ currentCategory.replace(/-/g, ' ') }}</span>
        <button @click="clearFilter" class="ml-4 text-sm text-blue-600 hover:underline">Limpar Filtro</button>
      </p>
      <p v-if="searchQuery" class="text-xl text-gray-600">
        Resultados para: "<span class="font-semibold">{{ searchQuery }}</span>"
        <button @click="clearSearch" class="ml-4 text-sm text-blue-600 hover:underline">Limpar Busca</button>
      </p>
    </div>

    <div class="flex justify-end mb-6">
      <div class="relative inline-block text-gray-700">
        <select
          v-model="sortCriteria"
          @change="applySort"
          class="block appearance-none w-full bg-white border border-gray-300 rounded-md py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-blue-500"
        >
          <option value="">Ordenar por...</option>
          <option value="price-asc">Preço: Menor para Maior</option>
          <option value="price-desc">Preço: Maior para Menor</option>
          <option value="name-asc">Nome: A-Z</option>
          <option value="name-desc">Nome: Z-A</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l1.414 1.414L15 10.414l-1.414-1.414L10 12.121 6.464 8.586 5.05 10l5 5 5-5z"/>
          </svg>
        </div>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center items-center h-64">
      <svg class="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      <p class="ml-4 text-lg text-gray-600">Carregando produtos...</p>
    </div>

    <div v-else-if="sortedAndPaginatedProducts.length === 0" class="text-center text-gray-600 text-xl mt-16">
      Nenhum produto encontrado.
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      <ProductCard v-for="product in sortedAndPaginatedProducts" :key="product.id" :product="product" />
    </div>

    <div v-if="totalProducts > 0 && totalPages > 1" class="flex justify-center items-center mt-12 space-x-4">
      <button
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Anterior
      </button>
      <span class="text-lg font-semibold text-gray-700">Página {{ currentPage }} de {{ totalPages }}</span>
      <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Próxima
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import ProductCard from '../components/ProductCard.vue';

const products = ref([]);
const loading = ref(true);
const totalProducts = ref(0);
const currentPage = ref(1);
const productsPerPage = 12;

const route = useRoute();
const router = useRouter();

const currentCategory = ref('');
const searchQuery = ref('');
const sortCriteria = ref('');


const totalPages = computed(() => {
  if (products.value.length === 0) return 1;
  return Math.ceil(products.value.length / productsPerPage);
});

const fetchProducts = async () => {
  loading.value = true;
  products.value = [];

  let url = '/products';
  const params = {};

  if (currentCategory.value) {
    url = `/products/category/${currentCategory.value}`;
  } else if (searchQuery.value) {
    url = '/products/search';
    params.q = searchQuery.value;
    params.limit = 100;
  } else {
    params.limit = 100;
  }

  try {
    const response = await axios.get(url, { params });
    const fetched = response.data.products || [];
    products.value = fetched;
    totalProducts.value = fetched.length;
  } catch (err) {
    console.error('Erro ao buscar produtos:', err);
    products.value = [];
    totalProducts.value = 0;
  } finally {
    loading.value = false;
  }
};

const sortedAndPaginatedProducts = computed(() => {
  let displayed = [...products.value];

  if (sortCriteria.value) {
    displayed.sort((a, b) => {
      if (sortCriteria.value === 'price-asc') return a.price - b.price;
      if (sortCriteria.value === 'price-desc') return b.price - a.price;
      if (sortCriteria.value === 'name-asc') return a.title.localeCompare(b.title);
      if (sortCriteria.value === 'name-desc') return b.title.localeCompare(a.title);
      return 0;
    });
  }

  const start = (currentPage.value - 1) * productsPerPage;
  return displayed.slice(start, start + productsPerPage);
});

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    updateRoute();
  }
};

const applySort = () => {
  currentPage.value = 1;
  updateRoute();
};

const clearFilter = () => {
  currentCategory.value = '';
  currentPage.value = 1;
  updateRoute();
};

const clearSearch = () => {
  searchQuery.value = '';
  currentPage.value = 1;
  updateRoute();
};

const updateRoute = () => {
  router.push({
    name: 'CategoryProducts',
    params: {
      category: currentCategory.value || undefined,
    },
    query: {
      search: searchQuery.value || undefined,
      page: currentPage.value,
      sort: sortCriteria.value || undefined,
    },
  });
};


watch(
  () => [route.params.category, route.query.search, route.query.page, route.query.sort],
  ([cat, search, page, sort]) => {
    currentCategory.value = cat || '';
    searchQuery.value = search || '';
    currentPage.value = parseInt(page) || 1;
    sortCriteria.value = sort || '';
    fetchProducts();
  },
  { immediate: true }
);
</script>
