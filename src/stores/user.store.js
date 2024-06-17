import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia';
import { useCurrentUser, getCurrentUser, useFirebaseAuth } from 'vuefire';
import { GoogleAuthProvider, updateProfile } from 'firebase/auth'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase';
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
      
      try {
        await addDoc(collection(db, "users"), {
          firstName: form.firstName,
          lastName: form.lastName,
          photo: '',
          shoppingList: [],
          userId: auth.currentUser.uid
        })
      } catch (err) {
        console.log(err)
      }
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
    // check if user is in firebase, and just sign in. 
    // if new user, create firestore collection for user

    try {
      await signInWithPopup(authVueFire, googleAuthProvider);
      const userId = auth.currentUser.uid;
      const firstName = auth.currentUser.displayName.split(' ')[0];
      const lastName = auth.currentUser.displayName.split(' ')[1];
      const fbUsers = []

      const querySnapshot = await getDocs(collection(db, 'users'));
      querySnapshot.forEach((doc) => fbUsers.push(doc._document.data.value.mapValue.fields.userId.stringValue))

      if (!fbUsers.some((i) => i === userId)) {
        try {
          await addDoc(collection(db, "users"), {
            firstName: firstName,
            lastName: lastName,
            photo: auth.currentUser.photoURL,
            shoppingList: [],
            userId: userId
          })
        } catch (err) {
          console.log(err)
        }
      }
  
      router.push('/recipes');
    } catch (err) {
      console.log(err)
    }
  };
  
  const logout = async () => {
    await signOut(authVueFire);
    router.push('/login')
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