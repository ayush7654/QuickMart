//importing services 

import {useState,useEffect,createContext, useContext} from 'react'
import { initializeApp } from "firebase/app";
import { getAuth ,createUserWithEmailAndPassword , signInWithEmailAndPassword,signOut,onAuthStateChanged, updateProfile } from "firebase/auth";
import { getFirestore ,doc, setDoc,getDocs, collection, deleteDoc } from 'firebase/firestore';
//initilaizing services
const firebaseConfig = {
  apiKey: "AIzaSyBrX1DICIvn_i5PrtRGL1PEYP7x4Fdfi6M",
  authDomain: "e-commerce-site-a1ada.firebaseapp.com",
  projectId: "e-commerce-site-a1ada",
  storageBucket: "e-commerce-site-a1ada.appspot.com",
  messagingSenderId: "651936045592",
  appId: "1:651936045592:web:43aca6f2313c396407416d"
};


const FirebaseApp = initializeApp(firebaseConfig);

const firebaseAuth = getAuth(FirebaseApp)

const firestore= getFirestore(FirebaseApp)

const FirebaseContext= createContext(null)

export const useFirebase=()=>useContext(FirebaseContext)

export const FirebaseProvider=(props)=>{

  const [currentUser,setCurrentUser]= useState(null)
  const [authLoading, setAuthLoading] = useState(true);


  useEffect(()=>{
    onAuthStateChanged(firebaseAuth,(user)=>{
      if(user){
        console.log("user is logged in")
        setCurrentUser(user)
      
      }else{
        console.log("No user is logged in")
        setCurrentUser(null)
      }
    })
  },[])

  useEffect(() => {
  const unsub = onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
    setAuthLoading(false); // 🔑 auth resolved
  });

  return () => unsub();
}, []);


  const isLoggedIn= currentUser?true:false



const SignUpUser = async (email, password, username) => {
  const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
  await updateProfile(userCredential.user, {
    displayName: username
  });

  // 🔥 Force refresh currentUser so UI updates immediately
  setCurrentUser({
    ...userCredential.user,
    displayName: username
  });

  return userCredential;
};

  const SignInUser=(email,password)=>{
    return signInWithEmailAndPassword(firebaseAuth,email,password)
  }
  const SignOutUser=()=>{
    return signOut(firebaseAuth)
  }

  const storeDataInFB = async (collectionName, userId, cartItems, ProductName, newProduct, productQuantity) => {
    const userDocRef = doc(firestore, collectionName, userId, cartItems, ProductName);
    
    // This will add both 'Product' and 'quantity' fields to the document
    await setDoc(userDocRef, { 
      Product: newProduct,
     
    }, { merge: true });
  };
  

  const getDataFromFB=async(collectionName,userId,cartItems)=>{
    const userDocRef = collection(firestore,collectionName,userId,cartItems)
    const docSnapShot = await getDocs(userDocRef)
    return docSnapShot
  }

  const deleteDataInFB = async (collectionName, userId, cartItems, ProductName) => {
    const docRef = doc(firestore, collectionName, userId, cartItems, ProductName);
    await deleteDoc(docRef);
};
  
  return <FirebaseContext.Provider 
         value={{SignUpUser,
         SignInUser,
         SignOutUser,
         currentUser,
         isLoggedIn,
         storeDataInFB,
         getDataFromFB, 
         deleteDataInFB,
         authLoading
         }}>
      {props.children}
  </FirebaseContext.Provider>
}