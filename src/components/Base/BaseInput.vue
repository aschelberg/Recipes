<script setup>

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  }
})

</script>


<template>
  <label class="block text-sm font-medium leading-6 text-gray-900 pt-2">{{ label }}</label>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    v-bind="$attrs"
    :placeholder="`${label}`"
    required="true"
    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
    >
</template>


<style lang="scss" scoped>

</style>