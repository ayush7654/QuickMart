import React from 'react'
import { MdPerson } from "react-icons/md";   
import './Logged_In.css'
import { signOut } from 'firebase/auth';
import ScrollButton from '../../../../components/ScrollingButton/ScrollingButton';
export default function Logged_In({firebase, signOut}) {
  return (
    <div className="account-loggedIn-div">
                <div className="loggedIn-user-div">
                    <div className="loggedIn-user-icon"> <MdPerson className="login-user-icon" /></div>
                    {/* <div className="loggedIn-user-name">{firebase.currentUser.displayName}</div> */}
                   
                       
    
                </div>
                <div className="loggedIn-text">
                  <div>User ID :</div> 
                  <div className="loggedIn-user">{firebase.currentUser.email}</div> 
                </div>
               {/* <div className="success-btn-div">
                <div id="loggedIn-link" className="about-btn">About us  →</div>
                <Link id="loggedIn-link" className="shop-btn" to='/store?page=1'>Shop Now →</Link>
                
               </div> */}
    
               <div className="loggedIn-links-div">
                <div id='logIn-link'>
                    <div id='logIn-link-icon-div'><img src='cart-Icon.png' id="logIn-Icon"/></div>
                    <div id='logIn-link-name'>Track Order</div>
                </div>
                  <div id='logIn-link'>
                    <div id='logIn-link-icon-div'><img src='profile-Icon.png' id="logIn-Icon"/></div>
                    <div id='logIn-link-name'>Visit Profile</div>
                </div>
                  <div id='logIn-link'>
                    <div id='logIn-link-icon-div'><img src='location-Icon.png' id="logIn-Icon"/></div>
                    <div id='logIn-link-name'>Find Store</div>
                </div>
               
               </div>
                
         {/*        <button id='account-button' className="signOutBtn" onClick={signOut}>Sign Out</button> */}
          
                <div  
     id='account-button' 
    /*  className={email || password ?'account-button-active':'account-button-inactive'} */
      onClick={signOut} >
          <ScrollButton
  text='Log Out'
  theme={'darkMode'}
  color="#cf7729ff"
  themeOnHover={'colorMode'}

/>
      </div>
            </div>
  )
}
