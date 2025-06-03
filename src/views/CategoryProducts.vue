<template>
  <div>
    <h1 class="text-3xl font-bold mb-6 text-center">Categoria: {{ categoryName }}</h1>
    <div v-if="loading" class="text-center">Carregando...</div>
    <div v-if="error" class="text-center text-red-500">{{ error }}</div>
    <div v-if="!loading && !error" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import ProductCard from '../components/ProductCard.vue';

const props = defineProps({
  categoryName: String
});

const products = ref([]);
const loading = ref(true);
const error = ref(null);
const route = useRoute();

const fetchProductsByCategory = async (category) => {
  loading.value = true;
  error.value = null;
  try {
    const response = await axios.get(`/products/category/${category}`);
    products.value = response.data.products;
  } catch (err) {
    error.value = 'Falha ao carregar produtos da categoria.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};


watch(() => props.categoryName, (newCategory) => {
  fetchProductsByCategory(newCategory);
}, { immediate: true });
</script>