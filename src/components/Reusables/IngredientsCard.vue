<script setup>
import IngredientPill from '@/components/Reusables/IngredientPill.vue';

const props = defineProps({
  ingredients: Array,
  measures: Array,
})

</script>

<template>
  <div>
    <div class="grid grid-cols-2 px-10 mt-4">
        <div class="text-sm">
          <div v-for="item in measures" class="py-1 px-2">
            <span v-show="item">{{ item }}</span>
          </div>
        </div>
        <div class="text-sm">
          <div v-for="item in ingredients">
            <IngredientPill :name="item"/>
          </div>
        </div>
      </div>
  </div>
</template>

<style lang="scss" scoped>

</style>