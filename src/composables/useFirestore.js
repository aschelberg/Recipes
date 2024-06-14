import { db } from '@/services/firebase';
import { useCurrentUser } from 'vuefire';
import {
  collection,
  query,
  getDocs,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { ref } from 'vue';

const useFirestore = (col) => {
  const currentUser = useCurrentUser();
  const q = query(collection(db, col));
  const fbShoppingList = ref([])
  const fbRecipeDocs = ref([])

  const getAllDocs = async () => {
    const query = await getDocs(q);
    if(col ==='users') {
      query.forEach((doc) => {
        if (doc.data().userId === currentUser.value.uid) fbShoppingList.value = doc.data().shoppingList
      });
      return fbShoppingList.value
    }
    if(col ==='savedRecipes') {
      query.forEach((doc) => {
        if (doc.data().userId === currentUser.value.uid) {
          fbRecipeDocs.value.push({
            docId: doc.id,
            userId: currentUser.value.uid,
            recipe: {
              recipeId: doc.data().recipeId,
              recipeName: doc.data().recipeName,
              recipePhoto: doc.data().recipePhoto,
            }
          })
        }
      });
      return fbRecipeDocs.value
    }
  };

  const getDocId = async (userId, recipeId) => {
    const query = await getDocs(q);
    let docId = ''
    if(col === 'users') {
      query.forEach((doc) => {
        if (doc.data().userId === userId){
          docId = doc.id
        }
      })
    }
    if(col === 'savedRecipes') {
      query.forEach((doc) => {
        if (doc.data().userId === userId && doc.data().recipeId === recipeId){
          docId = doc.id
        }
      })
    }
    return docId
  };

  const addShoppingItem = async (text, fbDocId) => {
    const userRef = doc(db, col, fbDocId)
    try{
      await updateDoc(userRef, {
        shoppingList: arrayUnion(text),
      });
    } catch (err) {
      console.log(err)
    }
  };

  const removeShoppingItem = async (text, fbDocId) => {
    const userRef = doc(db, col, fbDocId)
    await updateDoc(userRef, {
      shoppingList: arrayRemove(text)
    })
  }

  const addToRecipes = async (recipeId, recipePhoto, recipeName) => {
    await addDoc(collection(db, col), {
      userId: currentUser.value.uid,
      recipeId: recipeId,
      recipePhoto: recipePhoto,
      recipeName: recipeName
    });
  }

  const removeFromRecipes = async (docId) => {
    await deleteDoc(doc(db, col, docId))
  }

  return {
    getAllDocs,
    getDocId,
    addShoppingItem,
    removeShoppingItem,
    addToRecipes,
    removeFromRecipes
  };
};

export default useFirestore;