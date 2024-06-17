<script setup>
import useUserStore from '@/stores/user.store.js';

const userStore = useUserStore();
await userStore.logout();

window.location.href = '/login';
</script>

<template>

</template>