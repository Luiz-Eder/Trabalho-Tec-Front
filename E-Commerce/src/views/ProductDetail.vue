<template>
  <div class="container mx-auto p-4">
    <div class="mb-6">
      <button @click="goBack" class="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Voltar
      </button>
    </div>

    <div v-if="loading" class="text-center">Carregando...</div>
    <div v-if="error" class="text-center text-red-500">{{ error }}</div>
    <div v-if="product" class="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="md:w-1/2">
        <img :src="product.thumbnail" :alt="product.title" class="w-full h-full object-cover">
      </div>
      <div class="md:w-1/2 p-6 flex flex-col justify-between">
        <div>
          <h1 class="text-4xl font-bold text-gray-800 mb-2">{{ product.title }}</h1>
          <p class="text-gray-600 text-lg mb-4">{{ product.description }}</p>
          <p class="text-sm text-gray-500 mb-4">Categoria: <router-link :to="`/category/${product.category}`" class="text-blue-500 hover:underline capitalize">{{ product.category.replace(/-/g, ' ') }}</router-link></p>
          <p class="text-3xl font-extrabold text-gray-900 mb-4">${{ product.price.toFixed(2) }}</p>
          <div class="flex items-center mb-4">
            <span class="text-yellow-500">⭐ {{ product.rating }}</span>
            <span class="text-gray-500 ml-2">({{ product.stock }} em estoque)</span>
          </div>
        </div>
        <button
          @click="addItemToCart(product)"
          :disabled="product.stock === 0"
          class="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ product.stock > 0 ? 'Adicionar ao Carrinho' : 'Esgotado' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'; // Importe useRouter
import axios from 'axios';
import { useCartStore } from '../stores/cartStore';

const route = useRoute();
const router = useRouter(); // Inicialize o useRouter
const product = ref(null);
const loading = ref(true);
const error = ref(null);

const { addToCart } = useCartStore();

const fetchProduct = async () => {
  try {
    const response = await axios.get(`/products/${route.params.id}`);
    product.value = response.data;
  } catch (err) {
    error.value = 'Produto não encontrado.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const addItemToCart = (productToAdd) => {
  addToCart(productToAdd);
};

// Nova função para voltar à página anterior
const goBack = () => {
  router.go(-1); // Isso navega para a entrada anterior no histórico de rotas
};

onMounted(fetchProduct);
</script>