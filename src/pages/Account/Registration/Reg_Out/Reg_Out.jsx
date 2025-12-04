import React,{useState} from 'react'
import './Reg_Out.css'
export default function Reg_Out({firebase}) {


    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const [confirmPassword,setConfirmPassword]= useState('')
    const[username,setUsername]=useState('')

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

  return (
    <div  id='user-Input-box' >
          
           <div id='account-input-div' className='reg-Username-div'>
                     <div id='input-heading'>Username</div>
                     <input id='account-input' className='register-username' 
          placeholder='Example Username'
          name="username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}/>
              </div>
              <div id='account-input-div' className='reg-Email-div'>
                     <div id='input-heading'>Email</div>
                     <input id='account-input' className='register-emailId' 
          placeholder='example@email.com'
          name="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}/>
              </div>
       <div id='account-input-div' className='reg-password-div'>
              <div id='input-heading'>Password</div>
              <input id='account-input' className='register-password'
          placeholder='--------------'
          name="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}/>
       </div>
   <div id='account-input-div' className='reg-Confirm-password'>
       <div id='input-heading'>Confirm Password</div>
       <input id='account-input' className='register-ConfirmPassword'
         placeholder='--------------'
          name="password"
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}/>
   </div>
  
   <button id='account-button' className={email || password || username ?'account-button-active':'account-button-inactive'} onClick={SignUp}>SIGN IN</button> 
       </div>
  )
}
