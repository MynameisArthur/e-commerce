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


// asynchroniczna funkcja pobierająca obiekt auth i tworząca z niego nowy rekord w bazie w kolekcji "users"
export const createUserProfileDocument = async (userAuth,additionalData)=>{
  if(!userAuth)
  {
    return;
  }
  const userRef = firestore.doc(`users/${userAuth.uid}`);   
  const snapShot = await userRef.get();   
  if(!snapShot.exists)
  {
    const {displayName,email} = userAuth;
    const createdAt = new Date();
    try
    {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    }
    catch(error)
    {
      console.log('error creating user',error.message);      
    }
  }
  return userRef;  
};

export const addCollectionAndDocuments = async (collectionKey,objectsToAdd)=>{    
  const collectionRef = firestore.collection(collectionKey);    
  /*
    --- batch write ---
  jeśli wysyłam dane w kilku kawałkach i w połowie przerwie mi połączenie do bazy dojdzie tylko połowa tych danych
  grupowanie połączeń do bazy ma zapewnić kompletność danych... jeśli przerwie połączenie nic nie dojdzie do bazy; "albo wszystko albo nic"   
   */
  const batch = firestore.batch();
  objectsToAdd.forEach(obj=>{
    const newDocRef = collectionRef.doc();//pobierz dokument na pustym stringu, firbase da mi nowy ref dokumentu i stworzy losowy numer ID
   batch.set(newDocRef,obj);
  });
  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections)=>{
  const transformedCollection = collections.docs.map(doc=>{
    const {title, items} = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });
  return transformedCollection.reduce((accumulator,collection)=>{
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  },{});
};


firebase.initializeApp(config);
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = ()=> auth.signInWithPopup(provider);
  export default firebase;