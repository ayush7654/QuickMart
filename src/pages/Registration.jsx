import {useState} from 'react'
import {Link} from 'react-router-dom'
import { useFirebase } from '../components/FirebaseContext/Firebase';
export default function Registration(){

    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')

    const firebase= useFirebase();
    console.log(firebase)
    
    const SignUp=()=>{
        firebase.SignUpUser(email,password)
        setEmail('')
        setPassword('')
    }
  


 return(
    <>
   {firebase.isLoggedIn?<>
     <h1>Welcome {firebase.currentUser.email}!</h1>
     <Link to='/'>Go to Home Page</Link>
   </> :<div className="register-form">
   <input placeholder='Email Id'
          name="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}/>
   <input placeholder='Password'
          name="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}/>
   <button className="register-button" onClick={SignUp}>Register</button>
    </div>}
    
    
    </>
    
 )
}