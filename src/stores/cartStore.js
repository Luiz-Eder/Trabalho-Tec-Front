// src/stores/cartStore.js
import { ref, computed, watch } from 'vue';

// Chave para armazenar no localStorage
const CART_STORAGE_KEY = 'ecommerce_cart';

// Inicializa o carrinho com dados do localStorage, se existirem
const initialCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');

const cartItems = ref(initialCart);

// Observa mudanças em cartItems e as salva no localStorage
watch(cartItems, (newCart) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
}, { deep: true }); // 'deep: true' para observar mudanças em objetos dentro do array

// Funções do carrinho
const addToCart = (product) => {
  const existingItem = cartItems.value.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    // Certifica-se de adicionar apenas as propriedades necessárias para evitar objetos muito grandes no carrinho
    const { id, title, price, thumbnail, stock } = product;
    cartItems.value.push({ id, title, price, thumbnail, stock, quantity: 1 });
  }
};

const removeFromCart = (productId) => {
  cartItems.value = cartItems.value.filter(item => item.id !== productId);
};

const updateQuantity = (productId, newQuantity) => {
  const item = cartItems.value.find(item => item.id === productId);
  if (item) {
    if (newQuantity <= 0) {
      removeFromCart(productId); // Remove se a quantidade for 0 ou menos
    } else {
      // Garante que a quantidade não exceda o estoque disponível
      item.quantity = Math.min(newQuantity, item.stock);
    }
  }
};

// Computed properties (dados derivados do estado do carrinho)
const totalItems = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
});

const totalPrice = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

// Exporta as funções e computed properties para serem usadas nos componentes
export function useCartStore() {
  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice
  };
}