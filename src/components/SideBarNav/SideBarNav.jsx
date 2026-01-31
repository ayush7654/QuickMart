import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import './SideBarNav.css'
import { X } from 'lucide-react';


import { AiFillHome } from "react-icons/ai"; 

import { FaRegQuestionCircle } from "react-icons/fa";

import { RiCustomerService2Fill } from "react-icons/ri";

import { RiShoppingBasketFill } from "react-icons/ri";

import { MdPerson } from "react-icons/md";           
 




export default function SideBarNav({sideBarState, sideBarToggle}) {

    const elements= [
      {icon:< AiFillHome id='sideBar-icon' />,iconImg:'SBhome.png',iconName:'Home',path:'/'},
        {icon:< RiShoppingBasketFill id='sideBar-icon'/>,iconImg:'SBbasket.png',iconName:'Shop',path:'/store'},
          {icon:< MdPerson id='sideBar-icon'/>,iconImg:'user.png',iconName:'Account',path:'/login'},
        {icon:<FaRegQuestionCircle id='sideBar-icon'/>,iconImg:'SBfaq.png',iconName:'FAQ',path:''},
        {icon:<RiCustomerService2Fill id='sideBar-icon' />,iconImg:'SBhelpdesk.png',iconName:'Customer Support',path:''}
    ]

    

  return (
    <div
      style={{
        transform: sideBarState ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease-in-out',
      }}
    className='sideBarNav'>
        <div className='sideBarNav-head-div'>
 
          <div className='sideBar-cancel-div'>
                <X strokeWidth={1.5} className='sideBar-cancel' onClick={()=>sideBarToggle(false)} />
            </div> 

            <div className='sideBar-title-div'>
                <div className='sideBarNav-head-tagline'>Elevate your World with</div>
            <div className='sideBarNav-head'>SAARAS</div>
            </div>
            
            
          

            <div className='SB-head-line1'>
                <div className='sideBar-userIcon-div'><MdPerson className='SB-userIcon'/></div>
                <div className='sideBar-userInfo'>
                  <div className='sideBar-userName'>Guest</div>
                <div className='sideBar-userId'>user123@gmail.com</div>
                </div>
            
            </div>
            
        </div>
        <div className='sideBarNav-element-div'>
              {elements.map((item,index)=>
         <NavLink key={index} to={item.path} className='sideBarNav-element' onClick={()=>sideBarToggle(false)}>
            <div className='sideBarNav-Icon-div'> <img src={item.iconImg} width={25}/> {/* {item.icon} */}</div>
            <div className='sideBarNav-name'>{item.iconName}</div>
         </NavLink>
      )}
        </div>
    
        
        
    </div>
  )
}
