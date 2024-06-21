<script setup>
import { computed, ref } from 'vue';
import useUserStore from '@/stores/user.store.js';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, email, sameAs, helpers } from '@vuelidate/validators';
import BaseInput from '@/components/Base/BaseInput.vue'
import BaseButton from '@/components/Base/BaseButton.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const userStore = useUserStore();

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const rules = computed(() => ({
  firstName: {
  required
  },
  lastName: {
    required
  },
  email: {
    required,
    email
  },
  password: {
    required,
    minLength: minLength(6)
  },
  confirmPassword: {
    required,
    minLength: minLength(6),
    sameAs: helpers.withMessage('Passwords must match', sameAs(computed(() => form.value.password)))
  }
}));

const v$ = useVuelidate(rules.value, form)

const signup = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) return;
  await userStore.signup(form.value);
}
</script>

<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="@/assets/restaurant.png"
        alt="Your Company"
      />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Create your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-2">
        <BaseInput v-model="form.firstName" :label="'First Name'" type="text" />
        <span v-for="error in v$.firstName.$errors" :key="error.$uid" class="text-red-500">
          {{ error.$message }}
        </span>

        <BaseInput v-model="form.lastName" :label="'Last Name'" type="text" />
        <span v-for="error in v$.lastName.$errors" :key="error.$uid" class="text-red-500">
          {{ error.$message }}
        </span>

        <BaseInput v-model="form.email" :label="'Email Address'" type="email" />
        <span v-for="error in v$.email.$errors" :key="error.$uid" class="text-red-500" >
          {{ error.$message }}
        </span>

        <BaseInput v-model="form.password" :label="'Password'" type="password" />
        <span v-for="error in v$.password.$errors" :key="error.$uid" class="text-red-500" >
          {{ error.$message }}
        </span>

        <BaseInput v-model="form.confirmPassword" :label="'Confirm Password'" type="password" />
        <span v-for="error in v$.password.$errors" :key="error.$uid" class="text-red-500" >
          {{ error.$message }}
        </span>

        <div>
          <BaseButton @click="signup" :text="'Create Account'" class="mt-8 rounded-md"/>
        </div>
      </form>

      <div class="mt-10 text-center text-sm text-gray-500">
        
        <RouterLink
          :to="'/login'"
          class="font-semibold leading-6 text-green-600 hover:text-green-500"
          >Return to login </RouterLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
