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
          class="block appearance-none w-full bg-white border border-gray-300 rounded-md py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
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
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p class="ml-4 text-lg text-gray-600">Carregando produtos...</p>
    </div>

    <div v-else-if="sortedAndPaginatedProducts.length === 0 && !loading" class="text-center text-gray-600 text-xl mt-16">
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
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import ProductCard from '../components/ProductCard.vue';

const products = ref([]); // Armazena todos os produtos buscados da API para o filtro atual
const loading = ref(true);
const totalProducts = ref(0); // Reflete o total de produtos ANTES da paginação local
const currentPage = ref(1);
const productsPerPage = 12; // Quantidade de produtos por página

const route = useRoute();
const router = useRouter();

// Variáveis para filtros e busca
const currentCategory = ref('');
const searchQuery = ref('');

// Variável para ordenação
const sortCriteria = ref('');

// Computed property para o total de páginas (baseado nos produtos 'filtrados' localmente)
const totalPages = computed(() => {
  // Se não há produtos carregados, totalPages é 1 para evitar divisão por zero
  if (products.value.length === 0) return 1;
  return Math.ceil(products.value.length / productsPerPage);
});

const fetchProducts = async () => {
  loading.value = true;
  products.value = []; // Limpa os produtos antes de buscar

  let url = `https://dummyjson.com/products`;
  let params = {}; // Inicializa params vazios

  if (currentCategory.value) {
    url = `https://dummyjson.com/products/category/${currentCategory.value}`;
    // Para categorias, a API retorna todos os produtos da categoria. Não usamos limit/skip.
  } else if (searchQuery.value) {
    url = `https://dummyjson.com/products/search`;
    params.q = searchQuery.value;
    // Para busca, pedimos um limite alto para ter *todos* os resultados da busca e paginar localmente.
    params.limit = 100; // A DummyJSON tem um limite de 100 resultados por requisição.
  } else {
    // Para a listagem geral sem filtros, também pedimos um limite alto.
    params.limit = 100; // Buscamos a maioria/todos os produtos para ordenação e paginação local.
  }

  try {
    const response = await axios.get(url, { params });
    
    let fetchedProducts = response.data.products || [];
    products.value = fetchedProducts; // Armazena todos os produtos retornados pela API

    // totalProducts reflete o número de produtos retornados pela API (antes da paginação local)
    totalProducts.value = fetchedProducts.length; 

    // console.log('Fetched products:', fetchedProducts.length);
    // console.log('Total products for current filter (API response):', totalProducts.value);

  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    products.value = [];
    totalProducts.value = 0;
  } finally {
    loading.value = false;
    // console.log('Fetch completed. Loading:', loading.value);
  }
};

// Computed property para ordenar E PAGINAR os produtos visíveis
const sortedAndPaginatedProducts = computed(() => {
  let displayedProducts = [...products.value]; // Cria uma cópia para não modificar o original

  // Aplica a ordenação
  if (sortCriteria.value) {
    displayedProducts.sort((a, b) => {
      if (sortCriteria.value === 'price-asc') {
        return a.price - b.price;
      } else if (sortCriteria.value === 'price-desc') {
        return b.price - a.price;
      } else if (sortCriteria.value === 'name-asc') {
        return a.title.localeCompare(b.title);
      } else if (sortCriteria.value === 'name-desc') {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });
  }

  // Aplica a paginação local
  const startIndex = (currentPage.value - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  return displayedProducts.slice(startIndex, endIndex);
});


const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    // Atualiza a URL para refletir a nova página (e outros filtros/ordenação)
    router.push({
      query: {
        ...route.query,
        page: page,
        search: searchQuery.value || undefined,
        sort: sortCriteria.value || undefined
      },
      params: {
        category: currentCategory.value || undefined
      }
    });
  }
};

const applySort = () => {
  currentPage.value = 1; // Reseta para a primeira página ao aplicar nova ordenação
  router.push({
    query: {
      ...route.query,
      page: 1, // Sempre vai para a página 1 ao ordenar
      sort: sortCriteria.value || undefined
    },
    params: {
        category: currentCategory.value || undefined
    }
  });
};

const clearFilter = () => {
  currentCategory.value = '';
  currentPage.value = 1;
  router.push({ query: { search: searchQuery.value || undefined, page: 1, sort: sortCriteria.value || undefined } });
};

const clearSearch = () => {
  searchQuery.value = '';
  currentPage.value = 1;
  router.push({ query: { category: currentCategory.value || undefined, page: 1, sort: sortCriteria.value || undefined } });
};

// Observa mudanças na query de busca da URL
watch(
  () => route.query,
  (newQuery) => {
    searchQuery.value = newQuery.search || '';
    currentPage.value = parseInt(newQuery.page) || 1;
    sortCriteria.value = newQuery.sort || '';
    fetchProducts(); // Dispara nova busca quando query da URL muda
  },
  { immediate: true } // Dispara na montagem do componente
);

// Observa mudanças nos parâmetros da rota (ex: /category/...)
watch(
  () => route.params.category,
  (newCategory) => {
    currentCategory.value = newCategory || '';
    currentPage.value = 1; // Reseta página e busca ao mudar de categoria
    searchQuery.value = ''; 
    sortCriteria.value = route.query.sort || ''; // Mantém a ordenação
    fetchProducts(); // Dispara nova busca quando o parâmetro de categoria muda
  },
  { immediate: true } // Dispara na montagem do componente
);

</script>