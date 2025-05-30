<template>
  <div id="app" class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-grow">
      <router-view />
    </main>
    <Footer /> </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue'; // Importa o componente Footer
</script>

<style>
/* Você pode adicionar estilos globais aqui se precisar */
body {
  font-family: 'Inter', sans-serif; /* Exemplo de fonte */
  background-color: #f3f4f6; /* Cor de fundo padrão */
}
</style>