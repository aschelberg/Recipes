import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDTVe4kqm0u0i9V7Y8Xn1xQaRXhPWduH3k',
  authDomain: 'recipes-14c7a.firebaseapp.com',
  projectId: 'recipes-14c7a',
  storageBucket: 'recipes-14c7a.appspot.com',
  messagingSenderId: '10943970744',
  appId: '1:10943970744:web:bf935b9f781b7b74ef634d'
}

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export {
  firebaseApp,
  db
}