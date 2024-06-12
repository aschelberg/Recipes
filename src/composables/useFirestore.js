import { db } from '@/services/firebase';
import { useCurrentUser } from 'vuefire';
import {
  collection,
  query,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { ref } from 'vue';

const useFirestore = () => {
  const currentUser = useCurrentUser();
  const q = query(collection(db, 'users'));
  const fbDocId = ref('');
  const fbShoppingList = ref([])

  const getAllDocs = async () => {
    const query = await getDocs(q);
    query.forEach((doc) => {
      if (doc.data().userId === currentUser.value.uid) fbShoppingList.value = doc.data().shoppingList
    })
    return fbShoppingList.value
    
  };

  const getDocId = async () => {
    const query = await getDocs(q);
    query.forEach((doc) => {
      if (doc.data().userId === currentUser.value.uid) fbDocId.value = doc.id
    })
    return fbDocId.value
  };

  const addShoppingItem = async (text, fbDocId) => {
    const userRef = doc(db, 'users', fbDocId)
    try{
      await updateDoc(userRef, {
        shoppingList: arrayUnion(text),
      });
    } catch (err) {
      console.log(err)
    }
    
  };

  const removeShoppingItem = async (text, fbDocId) => {
    const userRef = doc(db, 'users', fbDocId)
    await updateDoc(userRef, {
      shoppingList: arrayRemove(text)
    })
  }

  return {
    getAllDocs,
    getDocId,
    addShoppingItem,
    removeShoppingItem
  };
};

export default useFirestore;