<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia';
import AuthenticatedLayout from '@/components/AuthenticatedLayout.vue';
import useUserStore from '@/stores/user.store.js';

const route = useRoute();

const userStore = useUserStore();
const { isAuthenticated } = storeToRefs(userStore);
</script>

<template>
  <div class="min-h-screen">
    <AuthenticatedLayout v-if="isAuthenticated">
      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <Transition mode="out-in">
            <Suspense :timeout="0">
              <!-- main content -->
              <component :is="Component"></component>

              <!-- loading state -->
              <template #fallback>
                Loading...
              </template>
            </Suspense>
          </Transition>
        </template>
      </RouterView>
    </AuthenticatedLayout>
    <div v-else>
      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <Transition mode="out-in">
            <Suspense :timeout="0">
              <!-- main content -->
              <component :is="Component"></component>

              <!-- loading state -->
              <template #fallback>
                Loading...
              </template>
            </Suspense>
          </Transition>
        </template>
      </RouterView>
    </div>
    <!-- <BaseConfirmation
      v-if="confirmation"
      v-model="confirmation.formData"
      :type="confirmation.type"
      :title="confirmation.title"
      :content="confirmation.content"
      :fields="confirmation.fields"
      :confirmText="confirmation.confirmText"
      :cancelText="confirmation.cancelText"
      :isConfirming="isConfirming"
      @confirmed="confirmation.onConfirm"
      @canceled="confirmation.onCancel"
    />
    <BaseNotification
      v-for="notification in notificationsStore.notifications"
      :key="notification.id"
      v-bind="notification"
      @removed="notificationsStore.remove(notification.id)"
    /> -->
  </div>
</template>

<style scoped>
* {
  font-family: "PT Sans", sans-serif;
  font-style: normal;
}
</style>
