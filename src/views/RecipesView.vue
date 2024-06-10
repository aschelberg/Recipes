<script setup>
import { ref, computed, watch, watchEffect } from 'vue';
import useRecipe from '@/composables/useRecipe.js';
import RecipeCard from '@/components/Reusables/RecipeCard.vue';
import BaseButton from '@/components/Base/BaseButton.vue';
import Search from '@/components/Search.vue';
// import Filters from '@/components/Filters.vue';

const searchFilter = ref('');
const recipes = ref([]);
// const page = ref(1);
// const limit = ref(10);
// const pagination = ref({});

const { getRandom, getAllByTerm } = useRecipe();

const handleSearch = async () => {
  recipes.value = [];
  const allRecipes = await getAllByTerm(searchFilter.value);
  for (const r of allRecipes) {
    const uniqueRecipes = r?.filter((recipe) => !recipes.value.some((i) => i.idMeal === recipe.idMeal)).map(({ idMeal, strMeal, strMealThumb }) => ({ idMeal, strMeal, strMealThumb }));
    recipes.value.push(...uniqueRecipes || []);
  };
};

const handleRandom = async () => {
  recipes.value = [];
  for(let i = 1; i <= 2; i++){
    const randomRecipe = await getRandom();
    recipes.value.push(randomRecipe[0]);
  };
};

</script>

<template>
  <main>
    <Search v-model="searchFilter" @update:modelValue="handleSearch"/>
    <div class="relative my-2">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-gray-200" />
      </div>
      <div class="relative flex justify-center text-sm font-medium leading-6">
        <span class="bg-gray-50 px-6 text-gray-900">OR</span>
      </div>
    </div>
    <BaseButton :text="'Generate Random Recipe'" @click="handleRandom" class="rounded-md mt-2 mb-4"/>
    <br class="pb-4">
    <!-- The Recipe tiles below -->
    <div class="grid grid-cols-2 gap-5">
      <div v-for="item in recipes">
       <RecipeCard
        :id="item.idMeal"
        :label="item.strMeal"
        :photo="item.strMealThumb"
       />
      </div>
    </div>
  </main>
</template>
