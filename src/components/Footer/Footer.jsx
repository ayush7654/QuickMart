import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import { FaGift, FaQuestionCircle, FaStore,FaMagic   } from "react-icons/fa";
import './Footer.css'
export default function Footer() {
  const location = useLocation()
  
  
  return (
    <div className='footer-div'style={{display:location.pathname==='/cart'?'none':'block'}}>
        <div className='footer-upper'>
<div className='upper-left'>
    <div className='left-a'>
        <div id='footer-title' className='left-a-title'>ABOUT</div>
    <div>Contact Us</div>
    <div>About Us</div>
    <div>Careers</div>
    <div>QuickMart Stories</div>
    <div>Corporate Information</div>
    </div>
    <div className='left-b'>
    <div id='footer-title' className='left-b-title'>GROUP COMPANIES</div>
    <div>Myntra</div>
    <div>ClearTrip</div>
    <div>Shopify</div>
    </div>
    <div className='left-c'>
    <div id='footer-title' className='left-c-title'>HELP</div>
    <div>Payments</div>
    <div>Shipping</div>
    <div>Cancellation & Returns</div>
    <div>FAQ</div>
    </div>
    <div className='left-d'>
    <div id='footer-title' className='left-d-title'>CONSUMER POLICY</div>
    <div>Terms Of Use</div>
    <div>Security</div>
    <div>Privacy</div>
    <div>Sitemap</div>
    <div>Grievance Redressal</div>
    </div>
</div>
<div style={{height:'100%',display:'flex',alignItems:'center'}}><div className='footer-midline'></div></div>
<div className='upper-right'>
    <div className='right-a'>
        <div id='footer-title'>Mail Us</div>
        <div>QuickMart Internet Private Limited, </div>
        <div>Buildings Alyssa, Begonia &</div>
        <div>Clove Embassy Tech Village,</div>
        <div>Bengaluru, 560103,</div>
        <div>Karnataka,India</div>
        <div>Social:</div>
        <div  style={{display:'flex', alignItems:'center',justifyContent:'space-between'}} ><img src='./fbIcon2.png' width='40px'/>
        <img src='./xIcon2.png' width='30px' />
        <img src='./ytIcon2.png' width='40px'/>
        <img src='./InstaIcon2.png' width='40px'/>
        </div>
    </div>
    <div className='right-b'>
        <div id='footer-title'>Registered Office Address</div>
        <div>QuickMart Internet Private Limited,</div>
        <div>Buildings Alyssa, Begonia &</div>
        <div>Clove Embassy Tech Village,</div>
        <div>Bengaluru, 560103,</div>
        <div>Karnataka,India</div>
        <div>CIN:U51109XYZXYZ2023PTC02245</div>
        <div>Telephone: <span style={{color:'blue'}}>044-9999999</span></div>
    </div>
</div>
        </div>
        <div className='footer-lower'>
            <div id='footerIcon'>  <FaStore size={25} style={{color:'rgb(147, 170, 213)'}}/> <span>Become a Seller</span></div>
            <div id='footerIcon'>  <FaMagic  size={25} style={{color:'rgb(147, 170, 213)'}}/> <span>Advertise</span></div>
            <div id='footerIcon'> <FaGift size={25} style={{color:'rgb(147, 170, 213)'}} /><span>Gift Cards</span></div>
            <div id='footerIcon'>   <FaQuestionCircle size={25} style={{color:'rgb(147, 170, 213)'}} /><span>Help Center</span></div>
          
       
      
       
       
        </div>
    </div>
  )
}
