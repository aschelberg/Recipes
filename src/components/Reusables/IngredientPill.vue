<script setup>
import {
  PlusIcon,
  CheckIcon
} from '@heroicons/vue/24/outline';
import { ref, computed } from 'vue';
import useFirestore from '@/composables/useFirestore.js';
import { useCurrentUser } from 'vuefire';

const props = defineProps({
  name: String,
})

const fbDocId = ref('');
const itemList = ref([]);
const currentUser = useCurrentUser();

const { getAllDocs, getDocId, addShoppingItem, removeShoppingItem } = useFirestore('users');
fbDocId.value = await getDocId(currentUser.value.uid)

const fetchAllDocs = async () => (itemList.value = await getAllDocs());
fetchAllDocs();

const addItem = async (text) => {
  await addShoppingItem(text, fbDocId.value);
  fetchAllDocs();
};

const removeItem = async (text) => {
  await removeShoppingItem(text, fbDocId.value);
  fetchAllDocs();
};

const isInList = () => itemList.value.find((i) => i.toLowerCase() === props.name.toLowerCase())
isInList()

</script>

<template>
  <div class="flex justify-between py-1 px-2">
    <div>{{ name }}</div>
    <div class="flex rounded-full hover:bg-gray-300 cursor-pointer hover:transition-all">
      <PlusIcon v-if="!itemList.some((i)=>i === name)" class="my-auto h-4 w-4" @click="addItem(name)"/>
      <CheckIcon v-else class="my-auto h-4 w-4" @click="removeItem(name)"/>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>