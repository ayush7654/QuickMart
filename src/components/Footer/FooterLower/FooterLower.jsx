import React from 'react'
import './FooterLower.css'
import { FaGift, FaQuestionCircle, FaStore,FaMagic   } from "react-icons/fa";
export default function FooterLower() {
  return (
     <div className='footer-lower'>
            <div id='footerIcon-div'>  <FaStore id='footerIcon'  style={{color:'rgb(98, 212, 209)'}}/> <span >Become a Seller</span></div>
            <div id='footerIcon-div'>  <FaMagic  id='footerIcon' style={{color:'rgb(98, 212, 209)'}}/> <span>Advertise</span></div>
            <div id='footerIcon-div'> <FaGift id='footerIcon' style={{color:'rgb(98, 212, 209)'}} /><span>Gift Cards</span></div>
            <div id='footerIcon-div'>   <FaQuestionCircle id='footerIcon' style={{color:'rgb(98, 212, 209)'}} /><span>Help Center</span></div>
          
        </div>
        
  )
}
