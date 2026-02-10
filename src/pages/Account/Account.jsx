import {useState} from "react";
import { useFirebase } from "../../components/FirebaseContext/Firebase";
import { Link } from "react-router-dom";
import Registration from "./Registration/Registration";
import Login from "./Login/Login";
import AnimatedUnderline from "../../components/AnimatedUnderline/AnimatedUnderline";
import DotNav from "../../components/DotNav/DotNav";

import './Account.css'





export default function Account(){

    const [sectionSwitch,setSectionSwitch] = useState(true)

    const [createAccount,setCreateAccount]= useState(false);

    const [activeTab, setActiveTab] = useState('login');

    const [isRegister, setIsRegister] = useState(false);
   
    const accoutSections = [{id:0,title:'Log In',function:true},
      {id:1,title:'Register',function:false}
     ]

     const handleSectionSwitch=(func)=>{
      setSectionSwitch(func)
     }

 
    

  // This ensures the dot position scales if the window is resized
  const getTransform = () => {
    const sectionWidth = 100 / sections.length;
    // Calculate the center of the active section
    const moveX = activeIndex * 100; 
    return `translateX(${moveX}%)`;
  };

    
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
      
  <DotNav
   sections={accoutSections}
   textColor="rgb(80,80,80)"
   textColorHover="black"
   handleClick={(func)=>handleSectionSwitch(func)}
   syncWithUrl={false}/>
         </div>


{/*    {sectionSwitch?<Login/>:<Registration/>} */}

<div className="account-content-wrapper">
  <div className="account-slider"style={{transform:`translateX(${sectionSwitch?'0%':'-50%'})`}} >
  <Login/>
  <Registration/>
  </div>

</div>

        </div>

    
    </div>
        
        
    )
}



