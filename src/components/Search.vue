<script setup>
import _ from 'lodash';

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

const handleSearch = _.debounce((e) => {
  emit('update:modelValue', e.target.value);
}, 500);

</script>

<template>
  <form class="pb-2 flex items-center">
    <label class="sr-only">Search:</label>
    <div class="relative w-full p">
      <div
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
      >
      </div>
      <input
        type="text"
        v-on:input="handleSearch"
        :value="modelValue"
        placeholder="Search by name"
        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
      />
    </div>
  </form>
</template>



<style lang="scss" scoped>

</style>