<script setup>
import RecipeCard from '@/components/Reusables/RecipeCard.vue';
import useFirestore from '@/composables/useFirestore';
import { ref } from 'vue';

const fbDocs = ref(null);

const { getAllDocs } = useFirestore('savedRecipes');
fbDocs.value = await getAllDocs();


</script>

<template>
  <div class="grid grid-cols-2 gap-5">
    <div v-for="item in fbDocs" >
      <RecipeCard
        :id="item.recipe.recipeId"
        :label="item.recipe.recipeName"
        :photo="item.recipe.recipePhoto"/>
    </div>
  </div>
</template>



<style lang="scss" scoped>

</style>