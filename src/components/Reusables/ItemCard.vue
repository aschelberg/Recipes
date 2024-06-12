<script setup>
import {
  XMarkIcon
} from '@heroicons/vue/24/outline';

const props = defineProps({
  listItem: String,
})

const emit = defineEmits(['removeItem'])

const removeItem = () => {
  emit('removeItem', props.listItem)
}

</script>

<template>
  <div class="flex w-[40%] border rounded-md mb-2 bg-gray-50 shadow-sm">
    <!-- Delete Button -->
    <div class="pr-2 my-auto">
      <button class="align-middle hover:text-red-600 hover:rounded-full hover:bg-gray-300 transition-all" @click="removeItem(listItem)">
        <XMarkIcon class="h-6 w-6"/>
      </button>
    </div>

    <!-- Item text -->
    <div class="flex">
      <span class="justify-center">{{ listItem }}</span>
    </div>

  </div>
</template>


<style lang="scss" scoped>

</style>