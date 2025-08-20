import {useState} from "react";
import { useFirebase } from "../../components/FirebaseContext/Firebase";
import Registration from "../../Registration/Registration";
import {Link} from "react-router-dom"

import { FaUser } from "react-icons/fa";

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
 <div className="LoginImg"></div>
<div className="login-container">
     <div className="login-page-title">ACCOUNT</div>

 <div className="login-page-switch">
    <div id='switch-section' className={sectionSwitch?'login-section-selected':'login-section'} /* style={{borderBottom:sectionSwitch?'2px solid black':'2px solid transparent'}} */ onClick={()=>setSectionSwitch(true)} /* className="login-section" */>LOG IN</div>
    <div id='switch-section'  className={sectionSwitch?'login-section':'login-section-selected'} onClick={()=>setSectionSwitch(false)} >REGISTER</div>
 </div>
   {sectionSwitch?   <div className="login-div">
     {firebase.isLoggedIn?<div className="login-success-box">
            <div className="loggedIn-user-div">
                <div className="loggedIn-user-icon"> <FaUser size={40} color={'rgb(70, 70, 70)'} /></div>
                <div className="loggedIn-user-name">{firebase.currentUser.displayName}</div>
               
                   

            </div>
            <div className="loggedIn-text">You are logged in with  <span className="loggedIn-user">{firebase.currentUser.email}</span> </div>
           
            <Link className="loggedIn-link" to='/store?page=1'>Shop Now →</Link>
            <button className="signOutBtn" onClick={SignOut}>SIGN OUT</button>
      
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
            placeholder="--------------"
            name="password"        
            value={password}
            onChange={(e)=>setPassword(e.target.value)}/> 
     </div> 

     <div className="forgot-pw"><div className="remember-checkmark"><input type="checkbox"   />Remember me</div><span className="forgot-pw-text">Forgot Password?</span></div>
     <div className="login-Or"><span className="or-line"></span><span className="or-line-text">Or</span><span className="or-line"></span></div>

     <div className="login-alts">
          <div className="google-login">
        <div id='login-alt-icon' className="google-login-icon"></div>
        <div className="google-login-text">Login with Google</div>
     </div>
       <div className="apple-login">
        <div  id='login-alt-icon' className="apple-login-icon"></div>
        <div className="apple-login-text">Login with Apple</div>
     </div>
     </div>
   
     
 
     <button  id='account-button' className={email || password ?'login-button-active':'login-button-inactive'} onClick={SignIn} >LOG IN</button>
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



