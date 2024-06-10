<script setup>
import BaseButton from '@/components/Base/BaseButton.vue';
import { ref } from 'vue';

const saved = ref(false);

</script>

<template>
<div>
  <div v-if="!saved">
    <BaseButton :text="'Save'" class="rounded-br-md bg-gree-300"/>
  </div>
  <div v-else>
    <BaseButton :text="'Saved'" class="rounded-br-md"/>
  </div>
  
</div>
</template>

<style lang="scss" scoped>

</style>