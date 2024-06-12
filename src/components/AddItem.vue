<script setup>
import { ref } from 'vue';
import BaseButton from '@/components/Base/BaseButton.vue';

import { useFirestore } from 'vuefire';

const db = useFirestore();

console.log(db)

const emit = defineEmits(['itemAdded']);
const itemText = ref('');
const addItem = () => {
  if(!itemText.value) console.log('if statement');
  emit('itemAdded',itemText.value);
  console.log(itemText.value)
  itemText.value;
}



</script>

<template>
  <div>
    <form class="grid grid-cols-4 pb-2 items-center" @submit.prevent="addItem">
      <label class="sr-only">Add Item to shopping list:</label>
        <input
          type="text"
          v-model="itemText"
          placeholder="Enter Item"
          class="col-span-3 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
        />
        <BaseButton :text="'Add Item'"class="w-[25%] ml-3 rounded-md"/>
    </form>
  </div>
</template>

<style lang="scss" scoped>

</style>