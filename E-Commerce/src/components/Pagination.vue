<template>
  <div class="flex justify-center items-center space-x-2 mt-8">
    <button
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
    >
      Anterior
    </button>
    <span class="px-4 py-2">Página {{ currentPage }} de {{ totalPages }}</span>
    <button
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
    >
      Próximo
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  currentPage: Number,
  totalPages: Number
});

const emit = defineEmits(['page-changed']);

const changePage = (page) => {
  if (page > 0 && page <= props.totalPages) {
    emit('page-changed', page);
  }
};
</script>