import {useState} from 'react'
import {Link} from 'react-router-dom'
import { useFirebase } from '../components/FirebaseContext/Firebase';
import './Registration.css'
export default function Registration(){

    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const [confirmPassword,setConfirmPassword]= useState('')

    const firebase= useFirebase();
    console.log(firebase)
    
    const SignUp=()=>{
       if(password===confirmPassword){
              firebase.SignUpUser(email,password)
              setEmail('')
              setPassword('')
       }else{
              alert("Passowrd is not matching!")
       }
      
    }
  


 return(

/*  <div className="register-page-In"> {/* <div className='register-Img'></div> */

       
       <div className='register-page-div'>
      {firebase.isLoggedIn?<div className='reg-loggedIn'>
     
       <div className='regIn-Greeting'>Welcome to QuickMart!</div>
       <div className='regIn-User'>Your are logged in with {firebase.currentUser.email}</div>
       <Link className='regIn-link' to='/'>Get started →</Link>
      
      </div>: <div className='register-box' >
           {/*    <div className='register-title'>Create an account</div> */}
           <div className='reg-Email-div'>
                     <div>Username</div>
                     <input className='register-emailId' 
          placeholder='Example Username'
          name="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}/>
              </div>
              <div className='reg-Email-div'>
                     <div>Email</div>
                     <input className='register-emailId' 
          placeholder='example@email.com'
          name="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}/>
              </div>
       <div className='reg-password-div'>
              <div>Password</div>
              <input className='register-password'
          placeholder='--------------'
          name="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}/>
       </div>
   <div className='reg-Confirm-password'>
       <div>Confirm Password</div>
       <input className='register-ConfirmPassword'
         placeholder='--------------'
          name="password"
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}/>
   </div>
  
   <button className="register-page-button" onClick={SignUp}>SIGN IN</button> 
       </div>}
       </div>


/*     </div> */
    
    
    
  
    
 )
}