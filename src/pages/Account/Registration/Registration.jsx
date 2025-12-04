import {useState} from 'react'
import {Link} from 'react-router-dom'
import { useFirebase } from '../../../components/FirebaseContext/Firebase';
import Reg_In from './Reg_In/Reg_In';
import Reg_Out from './Reg_Out/Reg_Out';
import './Registration.css'
export default function Registration(){

  
    const firebase= useFirebase();
    console.log(firebase)
    
 
  


 return(


       
       <div className='account-div'>
      {firebase.isLoggedIn && firebase.currentUser.displayName?
      
       <Reg_In firebase={firebase}/>
      : 
      
      <Reg_Out  firebase={firebase} />
       
       }
       </div>



    
    
    
  
    
 )
}