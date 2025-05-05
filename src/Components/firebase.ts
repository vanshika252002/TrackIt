import { initializeApp } from 'firebase/app';

import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC5evclnia2KOeej4yf9UMRIr3bgD8iH4I',
  authDomain: 'flightradar25-09-2002.firebaseapp.com',
  projectId: 'flightradar25-09-2002',
  storageBucket: 'flightradar25-09-2002.firebasestorage.app',
  messagingSenderId: '434355186736',
  appId: '1:434355186736:web:2bb51c9cbd4d06b60d51f5',
  measurementId: 'G-GJ0TDMFT3F',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
export { collection, addDoc };
