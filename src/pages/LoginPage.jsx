import {useState,useContext,useEffect} from "react";
import { useFirebase } from "../components/FirebaseContext/Firebase";
import {Link} from "react-router-dom"
import UserInfo from "../UserInfo";
import { BreadCrumbContext } from "../App";


export default function LoginPage(){
   
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

    
   /*  const[BreadCrumbs,setbreadcrumbs]= useContext(BreadCrumbContext) */
     console.log(firebase.currentUser)
  
 
    
    return(<div className="Login-Page">
   <h1>Welcome to Online Store</h1>
   {firebase.isLoggedIn?<div className="login-success-box">
            <h2>You are logged in with {firebase.currentUser.email}</h2>
            <button onClick={SignOut}>Sign Out</button>
        </div>:(
     <div className="login-div">
      
        <div className="login-box">
        <h2>Get Started!</h2>
     <div className="Email">
        <div>Email</div>
        <input className="login-email" 
            placeholder="type your Email" 
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}/> 
     </div>
     <div className="Password">
       <div>Password</div>
       <input className="login-password"  
            placeholder="type your password"
            name="password"        
            value={password}
            onChange={(e)=>setPassword(e.target.value)}/> 
     </div> 
     
 
     <button className='login-button'onClick={SignIn} >Log In</button>
 
      <div className="register-div">
         <div>Don't have an account?</div>
         <div><Link onClick={()=>setbreadcrumbs(prev=>[...prev,">Registration"])} to={"/register"}>Create account</Link></div>
     </div>   
        </div>
     
     </div>
       
    )}
    
    
    </div>
        
    )
}

