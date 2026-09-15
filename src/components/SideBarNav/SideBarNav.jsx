import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import './SideBarNav.css'
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { MdPerson } from 'react-icons/md';
import { 
  FiHome , 
  FiShoppingBag , 
  FiUser , 
  FiHelpCircle, 
  FiHeadphones 
} from 'react-icons/fi';
import { useFirebase } from '../FirebaseContext/Firebase';

export default function SideBarNav({sideBarState=true, sideBarToggle}) {

    const elements= [
      {icon:<  FiHome strokeWidth='1.5'  id='sideBar-icon' />,iconImg:'SBhome.png',iconName:'Home',path:'/'},
        {icon:<  FiShoppingBag strokeWidth='1.5'   id='sideBar-icon'/>,iconImg:'SBbasket.png',iconName:'Shop',path:'/store'},
          {icon:<FiUser strokeWidth='1.5'  id='sideBar-icon'/>,iconImg:'user.png',iconName:'Account',path:'/login'},
        {icon:< FiHelpCircle strokeWidth='1.5'  id='sideBar-icon'/>,iconImg:'SBfaq.png',iconName:'FAQ',path:''},
        {icon:< FiHeadphones strokeWidth='1.5'   id='sideBar-icon' />,iconImg:'SBhelpdesk.png',iconName:'Customer Support',path:''}
    ]


    const firebase = useFirebase()

    console.log(firebase.currentUser)
    

  return (
    <div
    /*   style={{
        transform: sideBarState ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease-in-out',
      }} */
    className={`sideBarNav ${sideBarState?'open':''}`}> 

    <div className="sideBarNav-content" style={{opacity:sideBarState?1:0}}>
        <div className='sideBarNav-head-div'>
 
          <div className='sideBar-cancel-div'>
                <X strokeWidth={1.5} className='sideBar-cancel' onClick={()=>sideBarToggle(false)} />
            </div> 

            <div className='sideBar-title-div'>
                <div className='sideBarNav-head-tagline'>Elevate your World with</div>
            <div className='sideBarNav-head'>SARAS</div>
            </div>
            
            
          

            <div className='SB-head-line1'>
                <div className='sideBar-userIcon-div'>{firebase?.currentUser?<img src='MockDP4.avif'/>:<MdPerson className='SB-userIcon'/>}</div>
                <div className='sideBar-userInfo'>
                  <div className='sideBar-userName'>{firebase?.currentUser?.displayName ? firebase.currentUser.displayName : 'Guest'}</div>
                <div className='sideBar-userId'>{firebase?.currentUser?.email ? firebase.currentUser.email :<Link to='/Login' className='side-nav-logIn'>Log in to shop</Link>}</div>
                </div>
            
            </div>
            
        </div>
        <div className='sideBarNav-element-div'>
              {elements.map((item,index)=>
         <NavLink key={index} to={item.path} className='sideBarNav-element' onClick={()=>sideBarToggle(false)}>
            <div className='sideBarNav-Icon-div'> {item.icon}</div>
            <div className='sideBarNav-name'>{item.iconName}</div>
         </NavLink>
      )}
        </div>
    
        </div>
        
    </div>
  )
}
