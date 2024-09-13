//importing services 

import {useState,useEffect,createContext, useContext} from 'react'
import { initializeApp } from "firebase/app";
import { getAuth ,createUserWithEmailAndPassword , signInWithEmailAndPassword,signOut,onAuthStateChanged} from "firebase/auth";
import { getFirestore ,doc, setDoc,getDocs, collection} from 'firebase/firestore';
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

  const isLoggedIn= currentUser?true:false

  const SignUpUser=(email,password)=>{
   return createUserWithEmailAndPassword(firebaseAuth,email,password)
  }
  const SignInUser=(email,password)=>{
    return signInWithEmailAndPassword(firebaseAuth,email,password)
  }
  const SignOutUser=()=>{
    return signOut(firebaseAuth)
  }

  const storeDataInFB=async(collectionName,userId,cartItems,ProductName,newProduct)=>{
    const userDocRef= doc(firestore,collectionName,userId,cartItems,ProductName)
    await setDoc(userDocRef,{Product:newProduct},{merge:true})
  }

  const getDataFromFB=async(collectionName,userId,cartItems)=>{
    const userDocRef = collection(firestore,collectionName,userId,cartItems)
    const docSnapShot = await getDocs(userDocRef)
    return docSnapShot
  }
  
  return <FirebaseContext.Provider value={{SignUpUser,SignInUser,SignOutUser,currentUser,isLoggedIn,storeDataInFB,getDataFromFB}}>
      {props.children}
  </FirebaseContext.Provider>
}