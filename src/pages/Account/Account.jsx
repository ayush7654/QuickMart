import {useState} from "react";
import { useFirebase } from "../../components/FirebaseContext/Firebase";
import { Link } from "react-router-dom";
import Registration from "./Registration/Registration";
import Login from "./Login/Login";
import AnimatedUnderline from "../../components/AnimatedUnderline/AnimatedUnderline";



import './Account.css'





export default function Account(){

    const [sectionSwitch,setSectionSwitch] = useState(true)

    const [createAccount,setCreateAccount]= useState(false);
   
  
    
    return(
    <div className="account-Page">
       <div className="accountPageImg">
        <div className='account-head-div'>
          <h2 className="account-head">ACCOUNT</h2>
          <p className="account-head-description">Create an account to personalize your experience and unlock everything the store has to offer.</p>
        </div>
       </div>
         <div className="account-container">
          <Link to='/' className="account-page-title-div">
            <div className="account-page-title-tagline">Elevate your world with</div>
            <div className="account-page-title">SARAS</div>
          </Link>
          

          <div className="account-page-switch">
           <div id='switch-section' 
           className={sectionSwitch?'account-section-selected':'account-section'} 
            onClick={()=>setSectionSwitch(true)} >
             <AnimatedUnderline from="center" color="rgba(50,50,50, 1)" thickness={1.5}>
              <span id='switch-section-head' >LOG IN</span> 
              </AnimatedUnderline> 
             </div>
              <span style={{fontSize:'1.2rem', color:'rgb(150,150,150)', fontWeight:'200'}}>|</span>
           <div id='switch-section'
             className={sectionSwitch?'account-section':'account-section-selected'} 
             onClick={()=>setSectionSwitch(false)} >
               <AnimatedUnderline from="center" color="rgba(50,50,50, 1)" thickness={1.5}>
                <span id='switch-section-head' >REGISTER</span>
                 </AnimatedUnderline> 
             </div>
         </div>


   {sectionSwitch?<Login/>:<Registration/>}
        </div>

    
    </div>
        
        
    )
}



