<script setup>

const props = defineProps({
  text: {
    type: String,
  }
})

</script>

<template>
  <div>
    <button type="button" @click="signin" class="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">{{ text }}</button>
  </div>
</template>

<style lang="scss" scoped>

</style>