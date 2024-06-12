<script setup>
import { ref } from 'vue';
import useFirestore from '@/composables/useFirestore.js';
import AddItem from '@/components/AddItem.vue';
import ItemCard from '@/components/Reusables/ItemCard.vue';

const itemText = ref('');
const fbDocId = ref('');
const itemList = ref([]);

const { getAllDocs, getDocId, addShoppingItem, removeShoppingItem } = useFirestore();

fbDocId.value = await getDocId()

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

</script>

<template>
  <div>
    <div>
      <AddItem v-model="itemText" @addItem="addItem" />
      <!-- <div v-show="message" class="flex justify-center text-red-500 italic">
        {{ message }}
        <span class="pl-1"> is already in the list</span>
      </div> -->
    </div>
    <div><span>Number of items: </span>{{ itemList.length }}</div>
    <div>
      <div v-for="item in itemList">
        <ItemCard :listItem="item" @removeItem="removeItem" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>