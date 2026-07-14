import React from 'react'
import './FooterLower.css'
import { FaGift, FaQuestionCircle, FaStore,FaMagic   } from "react-icons/fa";
export default function FooterLower() {
  return (
     <div className='footer-lower'>
        
            {/*     <div id='footerIcon-div'> 
              <div id='footerIcon-wrapper'>
                 <FaStore id='footerIcon'  style={{color:'rgb(98, 212, 209)'}}/> <span >Become a Seller</span>
              </div>
             </div>

             
            <div id='footerIcon-div'>
                <div id='footerIcon-wrapper'>
                 <FaMagic  id='footerIcon' style={{color:'rgb(98, 212, 209)'}}/> <span>Advertise</span>
              </div>
            </div>

             

             <div id='footerIcon-div'>
                <div id='footerIcon-wrapper'>
                 <FaGift id='footerIcon' style={{color:'rgb(98, 212, 209)'}} /><span>Gift Cards</span>
              </div>
            </div>

            <div id='footerIcon-div'>
                <div id='footerIcon-wrapper'>
                 <FaQuestionCircle id='footerIcon' style={{color:'rgb(98, 212, 209)'}} /><span>Help Center</span>
              </div>
            </div>
 */}
<div className='lower-footer-top'>
    <div className='footer-head-wrapper'>
      <span className='footer-head'>SARAS</span>
      <span className='footer-tagline'>REFINE LIVING</span>
      </div>
    <div className="app-store-link-wrapper">
      <div className='app-store-head'>DOWNLOAD THE APP</div> 
             <div className='app-container'>
               <img src='/WebsiteMedia/GoogleStoreIcon.png'/>
               <img src='/WebsiteMedia/AppleStoreIcon.png'/>
             {/*  <div id='app-img-div' className='google-app'></div>
              <div id='app-img-div' className='apple-app'></div> */}
             </div>
    </div>

</div>

 <div className='lower-footer-bottom'>
   <div className='footer-sm-text'>© Saras. All rights reserved.</div>
      
          <div className='app-store-head'>MADE BY ACCESS MEMORY</div>
 </div>
          
        </div>
        
  )
}
