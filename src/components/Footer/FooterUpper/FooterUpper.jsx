import React from 'react'
import { useLocation } from 'react-router-dom';
import './FooterUpper.css'
import { FaFacebook, FaXTwitter, FaYoutube, FaInstagram } from "react-icons/fa6";
export default function FooterUpper() {

    const location = useLocation();

    console.log('location is ,', location)
  return (
     <div className='footer-upper' style={{  display: location.pathname === "/" || location.pathname === "/store"
    ? "none"
    : "flex"}}>
<div className='upper-left'>
    <div className='left-a'>
        <div id='footer-title' className='left-a-title'>About</div>
        <div id='footer-list'>
        <div>Contact Us</div>
    <div>About Us</div>
    <div>Careers</div>
    <div> Stories</div>
    <div>Firm Info</div>
        </div>

    </div>
    <div className='left-b'>
    <div id='footer-title' className='left-d-title'>Consumer Policy</div>
    <div id='footer-list' >
    <div>Terms Of Use</div>
    <div>Security</div>
    <div>Privacy</div>
    <div>Sitemap</div>
    <div>Grievance</div>
    </div>
   
    </div>
 
    <div className='left-d'>
          <div id='footer-title' className='left-b-title'>Companies</div>
    <div id='footer-list'>
    <div>Myntra</div>
    <div>ClearTrip</div>
    <div>Shopify</div>
    </div>
  
   
    </div>
</div>
<div style={{display:'flex',alignItems:'center'}}><div className='footer-midline'></div></div>
<div className='upper-right'>
    <div className='right-a'>
        <div id='footer-title'>Mail Us</div>
        <div id='footer-list'>
        <div>QuickMart Internet Private Ltd, </div>
        <div>Buildings Alyssa, Begonia &</div>
        <div>Clove Embassy Tech Village,</div>
  
        </div>
      
        <div>Social:</div>
        <div className='social-icons-div' >
        <FaFacebook id='social-icon' /> 
        <FaXTwitter id='social-icon' /> 
        <FaYoutube id='social-icon'/>  
        <FaInstagram id='social-icon'/>
        </div>
    </div>
    <div className='right-b'>
        <div id='footer-title'> Office Address</div>
        <div id='footer-list' >
        <div>QuickMart Internet Private Ltd,</div>
        <div>Buildings Alyssa, Begonia &</div>
        <div>Clove Embassy Tech Village,</div>
        <div>CIN:U51109XYZXTC02245</div>
        <div>Telephone: <span style={{color:'blue'}}>044-9999999</span></div>
        </div>
     
    </div>
</div>
        </div>
  )
}
