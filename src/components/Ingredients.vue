<script setup>
import useFilters from '@/composables/useFilters.js';
import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/20/solid';
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue';
import { ref, computed, watch, watchEffect } from 'vue';

const props = defineProps({
  ingredients: Array,
})

const ingredientFilter = ref('');
const emit = defineEmits(['updateIngredient', 'clearIngredient'])

const clearIngredient = () => {
  ingredientFilter.value = '';
  emit('clearIngredient', ingredientFilter.value);
};

watch(
  ingredientFilter,
  () => {
    emit('updateIngredient', ingredientFilter.value);
  },
  { deep: true }
);

const queryIngredient = ref('');
const filteredIngredient = computed(() =>
  queryIngredient.value === ''
    ? props.ingredients
    : props.ingredients.filter((ingredient) => {
        return ingredient.strIngredient.toLowerCase().includes(queryIngredient.value.toLowerCase());
      })
);

</script>

<template>
  <!-- Ingredients Combobox -->
  <Combobox
      as="div"
      v-model="ingredientFilter"
      @update:modelValue="queryType = ''"
    >
      <ComboboxLabel
        class="block text-xs font-medium leading-6 text-gray-900 sr-only"
        >Select Ingredient:</ComboboxLabel
      >
      <div class="relative mt-1">
        <ComboboxInput
          class="w-full rounded-md border border-gray-300 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm focus:ring-1 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
          @change="queryIngredient = $event.target.value"
          @blur="queryIngredient = ''"
          :display-value="(ingredient) => ingredient"
          placeholder="Select Ingredient"
        />
        <ComboboxButton
          class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
        >
          <ChevronDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </ComboboxButton>

        <ComboboxOptions
          v-if="filteredIngredient"
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-sm bg-white py-1 text-base shadow-lg focus:outline-none sm:text-sm"
        >
          <ComboboxOption
            v-for="i in filteredIngredient"
            :value="i.strIngredient"
            as="template"
            v-slot="{ active, selected }"
          >
            <li
              :class="[
                'relative cursor-default select-none py-2 pl-3 pr-9',
                active ? 'bg-green-600 text-white' : 'text-gray-900',
              ]"
            >
              <span :class="['block truncate', selected && 'font-semibold']">
                {{ i.strIngredient }}
              </span>
              <span
                v-if="selected"
                :class="[
                  'absolute inset-y-0 right-0 flex items-center pr-4',
                  active ? 'text-white' : 'text-green-600',
                ]"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </div>
    </Combobox>
    <div class="relative mt-1 max-w rounded-md hover:text-black">
      <button
        type="button"
        @click.stop="clearIngredient"
        class="w-full rounded-md border font-medium border-red-500 bg-red-500 py-1.5 text-white sm:text-sm sm:leading-6 hover:bg-green-300 hover:border-green-300 transition-all"
      >
        Clear Filters
      </button>
    </div>
</template>



<style>

</style>
