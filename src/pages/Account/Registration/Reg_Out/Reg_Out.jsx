import React,{useState} from 'react'
import './Reg_Out.css'
import ScrollButton from '../../../../components/ScrollingButton/ScrollingButton'
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
    <div  id='user-Input-box-div' >
        <div id='user-Input-content'>
        <div id='user-Input-box'>
                 <div id='account-input-div' className='reg-Username-div'>
                     <div id='input-heading'>Username</div>
                     <input id='account-input' className='register-username' 
          
          name="username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}/>
              </div>
              <div id='account-input-div' className='reg-Email-div'>
                     <div id='input-heading'>Email</div>
                     <input id='account-input' className='register-emailId' 
       
          name="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}/>
              </div>
       <div id='account-input-div' className='reg-password-div'>
              <div id='input-heading'>Password</div>
              <input id='account-input' className='register-password'
       
          name="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}/>
       </div>
   <div id='account-input-div' className='reg-Confirm-password'>
       <div id='input-heading'>Confirm Password</div>
       <input id='account-input' className='register-ConfirmPassword'
       
          name="password"
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}/>
   </div>
   </div>
      </div>
        
  
 {/*   <button id='account-button'
    className={email || password || username ?
    'account-button-active':'account-button-inactive'}
     onClick={SignUp}>SIGN IN</button> */} 


    <div  
     id='account-button' style={{pointerEvents:username||email || password?'auto':'none'}}
    /*  className={email || password ?'account-button-active':'account-button-inactive'} */
       onClick={SignUp}>
          <ScrollButton
  text='Sign In'
  theme={email || password || username?'darkMode':'lightMode'}
  color="#cf7729ff"
  themeOnHover={email || password || username?'colorMode':'lightMode'}

/>
      </div> 

       </div>
  )
}


/* 
   */