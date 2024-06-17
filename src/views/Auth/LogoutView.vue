<script setup>
import useUserStore from '@/stores/user.store.js';

const userStore = useUserStore();
await userStore.logout();

</script>

<template>

</template>