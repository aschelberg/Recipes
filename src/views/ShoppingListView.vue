<script setup>
import { ref } from 'vue';
import BaseInput from '@/components/Base/BaseInput.vue';
import AddItem from '@/components/AddItem.vue';

const addItem = () => {
  console.log('from Shopping List')
}

</script>

<template>
<div>
  <div>
    <AddItem @itemAdded="addItem"/>
  </div>

  <div>

  </div>

</div>
</template>

<style lang="scss" scoped>

</style>