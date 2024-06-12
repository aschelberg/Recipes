<script setup>
import {
  StarIcon as StarOutline
} from '@heroicons/vue/24/outline';
import {
  StarIcon as StarSolid
} from '@heroicons/vue/24/solid';

const props = defineProps({
  text: {
    type: String,
  }
});

</script>

<template>
  <button class="w-full justify-center bg-green-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:text-gray-500 disabled:bg-gray-200 disabled:border-none transition-all">
    {{ text }}
  </button>
</template>

<style lang="scss" scoped></style>