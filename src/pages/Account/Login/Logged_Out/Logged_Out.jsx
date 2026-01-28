import React from 'react'
import './Logged_Out.css'
import BracketButton from '../../../../components/BracketButton/BracketButton'
import ScrollButton from '../../../../components/ScrollingButton/ScrollingButton'
import FloatingInput from '../../../../components/FloatingInput/FloatingInput'
import IconButton from '../../../../components/IconButton/IconButton'
import { FiLock } from "react-icons/fi";
import { HiMail } from "react-icons/hi";
import { HiLockClosed } from "react-icons/hi";

import { RiPhoneFill } from "react-icons/ri";
export default function Logged_Out({email,password,setEmail,setPassword,signIn}) {
  return (
    <div id='user-Input-box-div' >
      <div id='user-Input-content'>
       
       <div id='user-Input-box'>
        
     <div id='account-input-div' className="Email">
     <div id='input-heading'>Email</div> 
         <input id='account-input' className="login-email" 
           
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}/>  

      <span className='account-input-icon-div'><HiMail  className='account-input-icon'/></span>
     {/*    <FloatingInput
        name='email'
        label='Email'
        value={email}
        onChange={(e)=>setEmail(e.target.value)}

        /> */}

     </div>
     <div id='account-input-div' className="Password">
        <div id='input-heading'>Password</div> 
        <input id='account-input' className="login-password"  
        
            name="password"        
            value={password}
            onChange={(e)=>setPassword(e.target.value)}/>  

             <span className='account-input-icon-div'><HiLockClosed   className='account-input-icon'/></span>
       {/*  <FloatingInput
        name='password'
        label='Password'
         value={password}
            onChange={(e)=>setPassword(e.target.value)}

        /> */}
     </div> 

     <div className="forgot-pw">
        <div className="remember-checkmark"><input type="checkbox"   />Remember me</div>
        <span className="forgot-pw-text">Forgot Password?</span>
    </div>

        <div  
     id='account-button' style={{pointerEvents:email || password?'auto':'none'}}
    /*  className={email || password ?'account-button-active':'account-button-inactive'} */
      onClick={signIn} >
          <ScrollButton
  text='Log In'
  theme={email || password ?'darkMode':'lightMode'}
  color="#cf7729ff"
  themeOnHover={email || password ?'colorMode':'lightMode'}

/>
      </div> 
   </div>
    


     <div className="login-Or">
      <span className="or-line"></span>
      <span className="or-line-text">or Login with</span>
      <span className="or-line"></span>
      </div>

   

 

 <div className='login-icon-wrapper'>
  <div className='login-icon-div'><img src='QMicons/GoogleIcon.png'/></div>
  <div className='login-icon-div'><img src='QMicons/AppleLogo.png'/></div>
  <div className='login-icon-div'><RiPhoneFill className='phone-icon'/></div>
</div> 

      </div>
 
   
     
 
  



        </div>
  )
}


