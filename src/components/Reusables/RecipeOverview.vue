<script setup>
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';
import { useCurrentUser } from 'vuefire';
import useRecipe from '@/composables/useRecipe.js';
import useFirestore from '@/composables/useFirestore';
import BaseButton from '@/components/Base/BaseButton.vue';
import IngredientsCard from '@/components/Reusables/IngredientsCard.vue';

const currentUser = useCurrentUser();
const route = useRoute();
const recipe = ref(null);
const fbDoc = ref('');

const ingredients = ref([]);
const measures = ref([]);
const instructions = ref([]);

const { getById } = useRecipe();
const fetchRecipe = await getById(route.params.id);
recipe.value = fetchRecipe[0];

// Clean how ingredients are extracted from request
const getIngredients = () => {
  const ingredientsName = Object.keys(recipe.value).filter((i) => i.includes('strIngredient'));
  const measuresName = Object.keys(recipe.value).filter((i) => i.includes('strMeasure'));
  for (const i of ingredientsName) {
    if(recipe.value[i] !== '') ingredients.value.push(recipe.value[i]);
  };
  for (const i of measuresName) {
    if(recipe.value[i] !== '') measures.value.push(recipe.value[i]);
  };
  instructions.value.push(recipe.value.strInstructions.split('\r\n'));
}
getIngredients()

// Handle docs from Firestore
const { getDocId, addToRecipes, removeFromRecipes } = useFirestore("savedRecipes");
const getDoc = async () => {
  fbDoc.value = await getDocId(currentUser.value.uid, recipe.value.idMeal);
}
getDoc()

const addRecipe = async () => {
  if(!fbDoc.value) {
    await addToRecipes(recipe.value.idMeal, recipe.value.strMealThumb, recipe.value.strMeal);
  }
  getDoc()
}

const removeRecipe = async () => {
  await removeFromRecipes(fbDoc.value)
  getDoc()
}

</script>

<template>
<div class="p-4">
  <div class="grid md:grid-cols-2 gap-6">
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
        <form @submit.prevent="addRecipe" v-if="!fbDoc">
          <BaseButton :text="'Save'" class="rounded-md mb-2"/>
        </form>
        <form v-else @submit.prevent="removeRecipe">
          <BaseButton :text="'Saved'" class="rounded-md mb-2"/>
        </form>
      </div>
      
      <IngredientsCard :ingredients="ingredients" :measures="measures" />
    </div>

    
  </div>

  <div class="mt-10 border p-2 rounded-md">
    <div class="flex justify-between border-b pb-2 mb-2">
      <h2>Steps:</h2>
      <button class="bg-red-500 text-white py-1 px-2 border border-black rounded-md hover:bg-gray-400 hover:text-black transition-all">
        <a :href="recipe.strYoutube" target="_blank">Watch on Youtube</a>
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