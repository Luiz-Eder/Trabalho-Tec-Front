import { ref, computed, watch } from 'vue';


const CART_STORAGE_KEY = 'ecommerce_cart';

const initialCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');

const cartItems = ref(initialCart);

watch(cartItems, (newCart) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
}, { deep: true }); 

const addToCart = (product) => {
  const existingItem = cartItems.value.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
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
      removeFromCart(productId); 
    } else {
      item.quantity = Math.min(newQuantity, item.stock);
    }
  }
};

const totalItems = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
});

const totalPrice = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

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