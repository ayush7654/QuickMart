import React from 'react'
import { useLocation } from 'react-router-dom';
import './FooterUpper.css'
import { FaFacebook, FaXTwitter, FaYoutube, FaInstagram } from "react-icons/fa6";
import { ChevronRight } from 'lucide-react';
import { LuChevronRight } from "react-icons/lu";
export default function FooterUpper() {

    const location = useLocation();


  return (
     <div className='footer-upper'/*  style={{  display: location.pathname === "/" || location.pathname === "/store"
    ? "none"
    : "flex"}} */>
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

<div className='upper-right'>
    <div className='upper-right-top'>
            <div className='right-a'>
        <div id='footer-title'>REGION &nbsp;/&nbsp; LANGUAGE</div>
        <div id='footer-list'>
   India &nbsp;|&nbsp; English
        </div>

    </div>
    <div className='right-b'>
        <div id='footer-title'> FOLLOW US ON</div>
          <div className='social-icons-div' >
        <FaFacebook id='social-icon' /> 
        <FaXTwitter id='social-icon' /> 
        <FaYoutube id='social-icon'/>  
        <FaInstagram id='social-icon'/>
        </div>
     
    </div>
    </div>

    <div className="upper-right-bottom">
        <div id='footer-title'> SUBSCRIBE</div>
        <div className="newsletter-wrapper">
            <input className='newsletter-input'
            placeholder='Fill in your email address.'/>
            <div className='newsletter-btn'>< LuChevronRight strokeWidth={1.5}/></div>
        </div>
    </div>

</div>
        </div>
  )
}
