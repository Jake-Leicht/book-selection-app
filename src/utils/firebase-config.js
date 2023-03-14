import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBIb0NfvZP5j5dk9FzIqBmHCdKrkSrJmDI",
    authDomain: "book-selection-app-29327.firebaseapp.com",
    projectId: "book-selection-app-29327",
    storageBucket: "book-selection-app-29327.appspot.com",
    messagingSenderId: "1056540835474",
    appId: "1:1056540835474:web:a3578edfb3ebafacefb04b",
    measurementId: "G-0HB827GQXJ"
}

const instance = initializeApp(firebaseConfig);

const db = getFirestore(instance);
const auth = getAuth(instance);

export {db, auth};