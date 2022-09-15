import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyB5xcurclnkoi00qGi5OA3_gJ0nhxnvSQI",
    authDomain: "miss-belleza.firebaseapp.com",
    projectId: "miss-belleza",
    storageBucket: "miss-belleza.appspot.com",
    messagingSenderId: "567475271772",
    appId: "1:567475271772:web:f8cdff5621dec285970e99",
    measurementId: "G-GRBBB7758D"
  };


const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)