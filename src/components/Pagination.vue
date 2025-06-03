<template>
  <div class="flex justify-center items-center gap-2 mt-10">
    <button
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
    >
      ‹
    </button>

    <template v-for="page in totalPages" :key="page">
      <button
        @click="changePage(page)"
        :class="[
          'w-9 h-9 border rounded-md text-sm font-medium',
          page === currentPage
            ? 'bg-black text-white'
            : 'text-gray-700 hover:bg-gray-100 transition'
        ]"
      >
        {{ page }}
      </button>
    </template>

    <button
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
    >
      ›
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
