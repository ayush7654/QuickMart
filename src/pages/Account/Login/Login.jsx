import React ,{useState} from 'react'
import { useFirebase } from '../../../components/FirebaseContext/Firebase'
import Logged_In from './Logged_In/Logged_In'
import Logged_Out from './Logged_Out/Logged_Out'
import'./Login.css'
export default function Login() {

 const [email,setEmail]= useState('')
 const [password,setPassword]= useState('')

    
    const firebase= useFirebase();
    console.log(firebase)


    const SignIn=()=>{
        firebase.SignInUser(email,password)
    }
    const SignOut=()=>{
        firebase.SignOutUser()
        setEmail("")
        setPassword("")
    }

    
  
     
  
  return (
    <div className="account-div">
         {firebase.isLoggedIn? 
         <Logged_In firebase={firebase} signOut={SignOut} /> 
         :
         <Logged_Out email={email} password={password} setEmail={setEmail} setPassword={setPassword} signIn={SignIn}/>
        }
         </div>
  )
}
