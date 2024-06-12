<script setup>
import {
  PlusIcon,
  CheckIcon
} from '@heroicons/vue/24/outline';
import { ref, computed } from 'vue';
import useFirestore from '@/composables/useFirestore.js';

const props = defineProps({
  name: String,
})

const fbDocId = ref('');
const itemList = ref([]);

const { getAllDocs, getDocId, addShoppingItem } = useFirestore();
fbDocId.value = await getDocId()

const fetchAllDocs = async () => (itemList.value = await getAllDocs());
fetchAllDocs();

const addItem = async (text) => {
  await addShoppingItem(text, fbDocId.value);
  fetchAllDocs();
};

console.log()

const isInList = () => {
  const x = itemList.value.find((i) => i === props.name)
  console.log(x)
}
isInList()

</script>

<template>
  <div class="flex justify-between py-1 px-2">
    <div>{{ name }}</div>
    <div class="flex rounded-full hover:bg-gray-300 cursor-pointer hover:transition-all">
      <span v-if="!itemList.some((i)=>i === name)">
        <PlusIcon class="h-4 w-4" @click="addItem(name)"/>
      </span>
      <span v-else>
        <CheckIcon class="h-4 w-4"/>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>