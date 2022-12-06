import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics";
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyDivEKcQNfKZNtCsujbZAKtsqUbdDw78M4",
    authDomain: "fir-78412.firebaseapp.com",
    projectId: "fir-78412",
    storageBucket: "fir-78412.appspot.com",
    messagingSenderId: "436137681268",
    appId: "1:436137681268:web:70ce6890431f829559cc21",
    measurementId: "G-34C5R2G1TH"
  };

  export const app= initializeApp(firebaseConfig)
  export const db= getFirestore()

//   export const analytics = getAnalytics(app);