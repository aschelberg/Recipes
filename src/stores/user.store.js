import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia';
import { useCurrentUser, useFirebaseAuth } from 'vuefire';
import { GoogleAuthProvider, updateProfile } from 'firebase/auth'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import useApi from '@/composables/useApi.js';

const useUserStore = defineStore('user', () => {
  const router = useRouter();
  const googleAuthProvider = new GoogleAuthProvider()
  const auth = getAuth();
  const authVueFire = useFirebaseAuth() // only exists on client side
  const { request } = useApi();

  const user = useCurrentUser();
  const isAuthenticated = computed(() => !!user.value);

  const signup = async (form) => {
    const displayName = form.firstName + ' ' + form.lastName;
    try {
      await createUserWithEmailAndPassword(auth, form.email, form.password)
      updateProfile(auth.currentUser, {
        displayName: displayName
      })
      router.push('/recipes');
    } catch (err) {
      console.log(err)
    }
  }
  const loginWithEmail = async (email, password) => {
    console.log(email, password)
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/recipes')
    } catch (err) {
      console.log(err)
    }
  }

  const loginWithProvider = async () => {
    try {
      await signInWithPopup(authVueFire, googleAuthProvider);
      router.push('/recipes');
    } catch (err) {
      console.log(err)
    }
  };
  
  const logout = async () => {
    await signOut(authVueFire);
  }

  return {
    isAuthenticated,
    user,
    signup,
    loginWithEmail,
    loginWithProvider,
    logout
  }
});

export default useUserStore;