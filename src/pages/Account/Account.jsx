import {useState} from "react";
import { useFirebase } from "../../components/FirebaseContext/Firebase";
import Registration from "./Registration/Registration";
import Login from "./Login/Login";
import {Link} from "react-router-dom"
import { MdPerson } from "react-icons/md";    
import { FaUser } from "react-icons/fa";


import './Account.css'





export default function Account(){

    const [sectionSwitch,setSectionSwitch] = useState(true)

    const [createAccount,setCreateAccount]= useState(false);
   
  
    
    return(
    <div className="account-Page">
       <div className="accountPageImg"></div>
         <div className="account-container">
          <div className="account-page-title">ACCOUNT</div>

          <div className="account-page-switch">
           <div id='switch-section' className={sectionSwitch?'account-section-selected':'account-section'} /* style={{borderBottom:sectionSwitch?'2px solid black':'2px solid transparent'}} */ onClick={()=>setSectionSwitch(true)} /* className="login-section" */>Log In</div>
           <div id='switch-section'  className={sectionSwitch?'account-section':'account-section-selected'} onClick={()=>setSectionSwitch(false)} >Register</div>
         </div>
   {sectionSwitch?<Login/>:<Registration/>}
        </div>

    
    </div>
        
        
    )
}



