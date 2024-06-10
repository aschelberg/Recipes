<script setup>
import Ingredients from '@/components/Ingredients.vue';
import useFilters from '@/composables/useFilters.js';
import { ref, computed, watch, watchEffect } from 'vue';

const ingredientFilter =ref('');
const ingredient = ref([]);

const { getIngredients } = useFilters();
const { meals } = await getIngredients();
ingredient.value = meals

const updateIngredient = (updateIngredient) => {
  ingredientFilter.value = updateIngredient
}
const clearIngredient = (updateIngredient) => {
  ingredientFilter.value = updateIngredient;
};

const filterIngredients = computed(() => {
  if(!ingredientFilter.value) return meals;
  return meals.filter((i) => i.strIngredient.toLowerCase() === ingredientFilter.value.toLowerCase())
})

watchEffect(ingredientFilter, filterIngredients)

</script>

<template>
  <div>
    <div class="mb-4">
      <Ingredients
      :ingredients="meals"
      @updateIngredient="updateIngredient"
      @clearIngredient="clearIngredient"/>
    </div>
    <div class="grid grid-cols-1 gap-4">
      <div v-for="i in filterIngredients" class="gap-4 py-6 shadow-sm bg-gray-100 border border-gray-400 rounded-md px-4">
        <h1 class="flex justify-center text-4xl font-semibold mb-4">{{ i.strIngredient }}</h1>
        <p>{{ i.strDescription }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>