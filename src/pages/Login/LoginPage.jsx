import {useState} from "react";
import { useFirebase } from "../../components/FirebaseContext/Firebase";
import Registration from "../../Registration/Registration";
import {Link} from "react-router-dom"
import './Login.css'





export default function LoginPage(){

    const [sectionSwitch,setSectionSwitch] = useState(true)

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
  
    {/*  <div className="LoginImg"></div> */}
    
    return(<div className="Login-Page">
 <div className="login-page-title">ACCOUNT</div>
<div className="login-container">
     

 <div className="login-page-switch">
    <div id='switch-section' style={{borderBottom:sectionSwitch?'3px solid black':'3px solid transparent'}} onClick={()=>setSectionSwitch(true)} className="login-section">LOG IN</div>
    <div id='switch-section' style={{borderBottom:sectionSwitch?'3px solid transparent':'3px solid black'}}  onClick={()=>setSectionSwitch(false)} className="register-section">REGISTER</div>
 </div>
   {sectionSwitch?   <div className="login-div">
     {firebase.isLoggedIn?<div className="login-success-box">
            <div className="loggedIn-text">You are logged in with </div>
            <div className="loggedIn-user">{firebase.currentUser.email}</div>
            <button className="signOutBtn" onClick={SignOut}>SIGN OUT</button>
            <Link className="loggedIn-link" to='/store?page=1'>Go to Store →</Link>
        </div>:(
      
        <div className="login-box">
     
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
     
 
     <button className='login-button'onClick={SignIn} >LOG IN</button>
 {/* 
      <div className="register-div">
         <div>Don't have an account?</div>
         <div><Link to={"/register"}>Create account</Link></div>
     </div>   */} 
        </div>
    )}
     </div> :
       
    
    <Registration/>}
</div>

    

    
    </div>
        
        
    )
}



