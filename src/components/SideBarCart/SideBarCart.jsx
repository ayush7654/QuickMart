import React,{useState} from 'react'
import './SideBarCart.css'
import { X } from 'lucide-react';
export default function SideBarCart({cartToggled,setCartToggled, toggleOverlay}) {


  return (
    <div className='cart-sidebar' 
    style={{
          transform: !cartToggled? 'translateX(0%)' : 'translateX(-100%)',
          transition: 'transform 0.5s ease-in-out',}}
    >
        <div className='side-cart-head-div'>
            <div className='side-cart-head-content'>
                 <span className='side-cart-head'>YOUR CART</span>  
          <span className='side-cart-cancel'>
            
         

    <X size={24} strokeWidth={1.5} onClick={()=>{setCartToggled(false),toggleOverlay(false)}}  />

  </span>
  </div>
        </div>
    </div>
  )
}
