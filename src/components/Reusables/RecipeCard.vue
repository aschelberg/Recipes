<script setup>
import BaseFavorite from '@/components/Base/BaseFavorite.vue';

const props = defineProps({
  label: {
    type: String,
  },
  photo: {
    type: String, 
  },
  id: {
    type: String
  }
})

</script>

<template>
    <div class="bg-gray-200 shadow-md rounded-md">
      <div class="flex">
        <img class=" w-full rounded-t-md" :src="`${photo}`">
      </div>
      <div class="flex justify-between my-auto">
        <RouterLink :to="`/recipes/recipe/${id}/${label}`" :id="id" :label="label" class="flex hover:text-gray-600">
          <div class="align-middle my-auto pl-3 text-md font-semibold">
            {{ label.toUpperCase() }}
          </div>
        </RouterLink>
        <BaseFavorite class="justify-end rounded-br-md"/>
      </div>
    </div>
</template>

<style lang="scss" scoped>

</style>