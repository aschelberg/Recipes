<script setup>
import BaseButton from '@/components/Base/BaseButton.vue';
import useFirestore from '@/composables/useFirestore';
import { ref } from 'vue';
import { useCurrentUser } from 'vuefire';

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

const currentUser = useCurrentUser();
const fbDoc = ref('');

const { getDocId, addToRecipes, removeFromRecipes } = useFirestore("savedRecipes");
const getDoc = async () => {
  fbDoc.value = await getDocId(currentUser.value.uid, props.id);
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
        <form @submit.prevent="addRecipe" v-if="!fbDoc">
          <BaseButton :text="'Save'" class="flex rounded-br-md"/>
        </form>
        <form v-else @submit.prevent="removeRecipe">
          <BaseButton :text="'Saved'" class="flex rounded-br-md"/>
        </form>
      </div>
    </div>
</template>

<style lang="scss" scoped>

</style>