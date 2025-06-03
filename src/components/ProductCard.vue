<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col">
    <router-link :to="`/product/${product.id}`">
      <img :src="product.thumbnail" :alt="product.title" class="w-full h-40 object-cover">
      <div class="p-4 flex-grow"> <h2 class="text-lg font-semibold text-gray-800 truncate">{{ product.title }}</h2>
        <p class="text-sm text-gray-500 mb-2 capitalize">{{ product.category.replace(/-/g, ' ') }}</p>
        <div class="flex items-center justify-between">
            <p class="text-xl font-bold text-gray-900">${{ product.price.toFixed(2) }}</p>
            <span v-if="product.stock > 0" class="text-green-600 text-sm">Em estoque: {{ product.stock }}</span>
            <span v-else class="text-red-500 text-sm">Fora de estoque</span>
        </div>
      </div>
    </router-link>
    <div class="p-4 pt-0"> <button
        @click="addItemToCart(product)"
        :disabled="product.stock === 0"
        class="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ product.stock > 0 ? 'Adicionar ao Carrinho' : 'Esgotado' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cartStore';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const { addToCart } = useCartStore();

const addItemToCart = (product) => {
  addToCart(product);
};
</script>