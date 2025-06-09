import {useState} from "react";
import { useFirebase } from "../../components/FirebaseContext/Firebase";
import {Link} from "react-router-dom"
import './Login.css'





export default function LoginPage(){

    const [createAccount,setCreateAccount]= useState(false);
   
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

    
  
     console.log(firebase.currentUser)
  
 
    
    return(<div className="Login-Page">
        <div className="LoginImg"></div>
  
 
     <div className="login-div">
     {firebase.isLoggedIn?<div className="login-success-box">
            <div className="loggedIn-text">You are logged in with </div>
            <div className="loggedIn-user">{firebase.currentUser.email}</div>
            <button onClick={SignOut}>Sign Out</button>
            <Link className="loggedIn-link" to='/store?page=1'>Go to Store →</Link>
        </div>:(
      
        <div className="login-box">
        <div className="login-title">Log in to get started!</div>
     <div className="Email">
        <div>Email</div>
        <input className="login-email" 
            placeholder="example@email.com..." 
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}/> 
     </div>
     <div className="Password">
       <div>Password</div>
       <input className="login-password"  
            placeholder="-----------"
            name="password"        
            value={password}
            onChange={(e)=>setPassword(e.target.value)}/> 
     </div> 
     
 
     <button className='login-button'onClick={SignIn} >Log In</button>
 
      <div className="register-div">
         <div>Don't have an account?</div>
         <div><Link to={"/register"}>Create account</Link></div>
     </div>   
        </div>
    )}
     </div>
       
    
    
    
    </div>
        
        
    )
}



