<script setup>
import IngredientPill from '@/components/Reusables/IngredientPill.vue';

const props = defineProps({
  ingredients: Array,
  measures: Array,
})

const newList = []

for(let i = 0; i < props.measures.length; i++) {
  if(props.measures[i] !== null && props.ingredients[i] !== null) {
    newList.push({
    measure: props.measures[i],
    ingredient: props.ingredients[i]
  })}
}

</script>

<template>
  <div>
    <table class="min-w-full divide-y divide-gray-100">
      <tbody class="divide-y divide-gray-200">
        <tr v-for="item in newList">
          <td class="grid grid-cols-2 px-2 py-2 text-sm text-gray-900">
            <span class="my-auto col-span-1">{{ item.measure }}</span>
            <IngredientPill :name="item.ingredient"/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>

</style>