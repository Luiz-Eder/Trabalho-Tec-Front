<template>
  <div class="container mx-auto px-6 py-8">
    <h1 class="text-4xl font-bold text-gray-800 mb-6 text-center">Entre em Contato</h1>
    <div class="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        Ficou com alguma dúvida, sugestão ou precisa de suporte? Entre em contato conosco!
        Nossa equipe está pronta para ajudar.
      </p>

      <div class="space-y-4 mb-6">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span class="text-gray-700">email@estore.com</span>
        </div>
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948-.684L10.25 2H13.75l1.022 2.316a1 1 0 00.948.684H19a2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
          </svg>
          <span class="text-gray-700">(14) 3312-4567</span>
        </div>
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="text-gray-700">Rua da Loja, 123 - Marília, São Paulo - CEP: 12345-678</span>
        </div>
      </div>

      <h2 class="text-2xl font-bold text-gray-800 mb-4">Envie uma Mensagem</h2>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Seu Nome</label>
          <input type="text" id="name" v-model="form.name" required
                 class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Seu E-mail</label>
          <input type="email" id="email" v-model="form.email" required
                 class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
        </div>
        <div>
          <label for="message" class="block text-sm font-medium text-gray-700">Mensagem</label>
          <textarea id="message" v-model="form.message" rows="4" required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
          Enviar Mensagem
        </button>
        <p v-if="successMessage" class="text-green-600 text-center mt-2">{{ successMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({
  name: '',
  email: '',
  message: ''
});

const successMessage = ref('');

const submitForm = () => {
  // Aqui você tipicamente enviaria os dados do formulário para um backend.
  // Por enquanto, vamos simular um envio bem-sucedido.
  console.log('Formulário de contato enviado:', form.value);
  successMessage.value = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
  
  // Limpar formulário após envio (opcional)
  form.value.name = '';
  form.value.email = '';
  form.value.message = '';

  // Limpa a mensagem de sucesso após alguns segundos
  setTimeout(() => {
    successMessage.value = '';
  }, 5000);
};
</script>