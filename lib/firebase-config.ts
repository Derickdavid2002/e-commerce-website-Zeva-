import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyB74Th_0tJCRclioVWw6vsv2p3LrMjnXpo",
  authDomain: "zeva-clothing.firebaseapp.com",
  projectId: "zeva-clothing",
  storageBucket: "zeva-clothing.appspot.com",
  messagingSenderId: "754050768645",
  appId: "1:754050768645:web:eeaf15d97b7c63fbbb616c",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
export const db = getFirestore(app)

// Initialize Authentication
export const auth = getAuth(app)

// Initialize Storage
export const storage = getStorage(app)

export default app
