// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyArvakvElsnJCTo7DalM0C5Kav9MTdsKUg",
    authDomain: "evangadi-forum-1b5c4.firebaseapp.com",
    projectId: "evangadi-forum-1b5c4",
    storageBucket: "evangadi-forum-1b5c4.appspot.com",
    messagingSenderId: "246715279208",
    appId: "1:246715279208:web:99d1963bd9eb9e98a318dd",
    timestampsInSnapshots:true
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const db = app.firestore();
// db.settings({timestampsInSnapshots:true})