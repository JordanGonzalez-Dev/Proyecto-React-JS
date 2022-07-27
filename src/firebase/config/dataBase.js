import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
    apiKey: "AIzaSyDMi_kmkl1llb4fphhQZ0cxu2xJoGUmudI",
    authDomain: "coderhouse-gameware.firebaseapp.com",
    projectId: "coderhouse-gameware",
    storageBucket: "coderhouse-gameware.appspot.com",
    messagingSenderId: "931270784240",
    appId: "1:931270784240:web:f76963c653928fc9e83e35"
};

const app = initializeApp(firebaseConfig);
export const dataBase = getFirestore(app);