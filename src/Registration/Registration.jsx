import {useState} from 'react'
import {Link} from 'react-router-dom'
import { useFirebase } from '../components/FirebaseContext/Firebase';
import './Registration.css'
export default function Registration(){

    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const [confirmPassword,setConfirmPassword]= useState('')
    const[username,setUsername]=useState('')

    const firebase= useFirebase();
    console.log(firebase)
    
    const SignUp=()=>{
       if(password===confirmPassword){
              firebase.SignUpUser(email,password,username)
               setUsername('')
              setEmail('')
              setPassword('')
             
       }else{
              alert("Passowrd is not matching!")
       }
      
    }
  


 return(

/*  <div className="register-page-In"> {/* <div className='register-Img'></div> */

       
       <div className='register-page-div'>
      {firebase.isLoggedIn && firebase.currentUser.displayName?<div className='reg-loggedIn'>
     
       <div className='regIn-User'>Hi, {firebase.currentUser.displayName}</div>
       <div className='regIn-Greeting'>Welcome to QuickMart</div>
       <div className='regIn-Para'>We bring you a seamless shopping journey with efficient, trustworthy service, so you spend less time waiting and more time enjoying.</div>
     
       <Link className='regIn-link' to='/'>Get Started →</Link>
      
      </div>: <div className='login-box' >
           {/*    <div className='register-title'>Create an account</div> */}
           <div id='reg-input-div' className='reg-Username-div'>
                     <div id='input-heading'>Username</div>
                     <input className='register-username' 
          placeholder='Example Username'
          name="username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}/>
              </div>
              <div id='reg-input-div' className='reg-Email-div'>
                     <div id='input-heading'>Email</div>
                     <input className='register-emailId' 
          placeholder='example@email.com'
          name="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}/>
              </div>
       <div id='reg-input-div' className='reg-password-div'>
              <div id='input-heading'>Password</div>
              <input className='register-password'
          placeholder='--------------'
          name="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}/>
       </div>
   <div id='reg-input-div' className='reg-Confirm-password'>
       <div id='input-heading'>Confirm Password</div>
       <input className='register-ConfirmPassword'
         placeholder='--------------'
          name="password"
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}/>
   </div>
  
   <button id='account-button' className={email || password || username ?'register-button-active':'register-button-inactive'} onClick={SignUp}>SIGN IN</button> 
       </div>}
       </div>


/*     </div> */
    
    
    
  
    
 )
}