import {useState} from "react";
import { useFirebase } from "../../components/FirebaseContext/Firebase";
import Registration from "./Registration/Registration";
import Login from "./Login/Login";
import AnimatedUnderline from "../../components/AnimatedUnderline/AnimatedUnderline";



import './Account.css'





export default function Account(){

    const [sectionSwitch,setSectionSwitch] = useState(true)

    const [createAccount,setCreateAccount]= useState(false);
   
  
    
    return(
    <div className="account-Page">
       <div className="accountPageImg"></div>
         <div className="account-container">
          <div className="account-page-title">Account</div>

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



