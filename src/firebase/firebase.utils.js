import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDYI1GQUblyi49uPq_WRaJwc9wWrbNh-UE",
  authDomain: "crwn-db-79d28.firebaseapp.com",
  databaseURL: "https://crwn-db-79d28.firebaseio.com",
  projectId: "crwn-db-79d28",
  storageBucket: "crwn-db-79d28.appspot.com",
  messagingSenderId: "368293631942",
  appId: "1:368293631942:web:31e922f1135bd502da44c7",
  measurementId: "G-LBQCVPE8J0"
};
firebase.initializeApp(config);
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = ()=> auth.signInWithPopup(provider);
  export default firebase;