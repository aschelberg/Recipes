<script setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import useRecipe from '@/composables/useRecipe.js';
import BaseButton from '@/components/Base/BaseButton.vue';
import IngredientsCard from '@/components/Reusables/IngredientsCard.vue';

const route = useRoute();
const recipe = ref(null);
const ingredientsName = ref([]);
const measuresName = ref([]);

const ingredients = ref([]);
const measures = ref([]);
const instructions = ref([]);

const { getById } = useRecipe();
const fetchRecipe = await getById(route.params.id);
recipe.value = fetchRecipe[0];

ingredientsName.value = Object.keys(recipe.value).filter((i) => i.includes('strIngredient'));
measuresName.value = Object.keys(recipe.value).filter((i) => i.includes('strMeasure'));


for (const i of ingredientsName.value) {
  if(recipe.value[i] !== '') ingredients.value.push(recipe.value[i]);
};
for (const i of measuresName.value) {
  if(recipe.value[i] !== '') measures.value.push(recipe.value[i]);
};

instructions.value.push(recipe.value.strInstructions.split('\r\n'));

</script>

<template>
<div class="p-4">
  <div class="grid grid-cols-2 gap-6">
    <!-- pic and other info -->
    <div>
      <div>
        <img class="rounded-md" :src="recipe.strMealThumb" :alt="recipe.strMeal">
      </div>
    </div>
    <!-- Ingredients/Measures and Instructions -->
    <div>
      <div class="flex justify-between my-auto border-b-2">
        <h1 class="align-middle">Ingredients:</h1>
        <div>
          <BaseButton v-if="true" :text="'Save'" class="rounded-md mb-2"/>
          <BaseButton v-else :text="'Saves'" class="rounded-md mb-2"/>
        </div>
      </div>
      
      <IngredientsCard :ingredients="ingredients" :measures="measures" />
    </div>

    
  </div>

  <div class="mt-6">
    <div class="flex justify-between">
      <h2>Steps:</h2>
      <button class="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-gray-400 hover:text-black transition-all">
        <a :href="recipe.strYoutube">Watch on Youtube</a>
      </button>
      
    </div>
    <ul type="1">
      <li v-for="(item, index) in instructions[0]" class="py-1">
        {{ index+1 }}. {{ item }}
      </li>
    </ul>
  </div>

</div>
</template>

<style lang="scss" scoped>

</style>