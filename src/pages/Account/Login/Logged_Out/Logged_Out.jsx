import React from 'react'
import './Logged_Out.css'
import BracketButton from '../../../../components/BracketButton/BracketButton'
import ScrollButton from '../../../../components/ScrollingButton/ScrollingButton'
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
     </div>
     <div id='account-input-div' className="Password">
       <div id='input-heading'>Password</div>
       <input id='account-input' className="login-password"  
        
            name="password"        
            value={password}
            onChange={(e)=>setPassword(e.target.value)}/> 
     </div> 

     <div className="forgot-pw">
        <div className="remember-checkmark"><input type="checkbox"   />Remember me</div>
        <span className="forgot-pw-text">Forgot Password?</span>
    </div>
   </div>
    


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
  )
}


