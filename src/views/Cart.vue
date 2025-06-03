<template>
  <div class="container mx-auto px-6 py-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">Seu Carrinho de Compras</h1>

    <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
      <strong class="font-bold">Sucesso!</strong>
      <span class="block sm:inline ml-2">{{ successMessage }}</span>
      <span @click="successMessage = ''" class="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer">
        <svg class="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
      </span>
    </div>

    <div v-if="cartItems.length === 0" class="text-center text-gray-600 text-xl mt-16">
      Seu carrinho está vazio. Comece a adicionar produtos!
      <router-link to="/" class="text-blue-600 hover:underline block mt-4">Voltar para a Loja</router-link>
    </div>

    <div v-else class="bg-white shadow-lg rounded-lg p-6">
      <div v-for="item in cartItems" :key="item.id" class="flex items-center justify-between border-b border-gray-200 py-4">
        <div class="flex items-center space-x-4">
          <img :src="item.thumbnail" :alt="item.title" class="w-20 h-20 object-cover rounded-md">
          <div>
            <h2 class="text-lg font-semibold text-gray-800">{{ item.title }}</h2>
            <p class="text-gray-600 text-sm">${{ item.price.toFixed(2) }}</p>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <div class="flex items-center border border-gray-300 rounded-md">
            <button @click="updateQuantity(item.id, item.quantity - 1)" class="px-3 py-1 bg-gray-100 rounded-l-md hover:bg-gray-200">-</button>
            <input
              type="number"
              v-model.number="item.quantity"
              @change="updateQuantity(item.id, item.quantity)"
              min="1"
              :max="item.stock"
              class="w-16 text-center border-x border-gray-300 focus:outline-none"
            >
            <button @click="updateQuantity(item.id, item.quantity + 1)" class="px-3 py-1 bg-gray-100 rounded-r-md hover:bg-gray-200">+</button>
          </div>
          <span class="text-lg font-bold text-gray-800 min-w-[80px] text-right">${{ (item.price * item.quantity).toFixed(2) }}</span>
          <button @click="removeFromCart(item.id)" class="text-red-600 hover:text-red-800">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      <div class="flex justify-end items-center mt-6 pt-4 border-t border-gray-200">
        <span class="text-2xl font-bold text-gray-800">Total: ${{ totalPrice.toFixed(2) }}</span>
        <button @click="finalizePurchase" class="ml-6 px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors">
          Finalizar Compra
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'; 
import { useCartStore } from '../stores/cartStore';

const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCartStore();

const successMessage = ref(''); 

const finalizePurchase = () => {
  if (cartItems.value.length === 0) {
    successMessage.value = 'Seu carrinho já está vazio!';
    setTimeout(() => {
      successMessage.value = '';
    }, 3000);
    return;
  }

  successMessage.value = 'Compra realizada com sucesso! Obrigado por sua compra.';
  
  setTimeout(() => {
    cartItems.value = []; 
  }, 1500); 

  setTimeout(() => {
    successMessage.value = '';
  }, 5000); 
};
</script>