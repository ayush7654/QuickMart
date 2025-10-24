import React from 'react'
import './NewsLetter.css'
import { FaFacebook, FaXTwitter, FaYoutube, FaInstagram } from "react-icons/fa6";

export default function NewsLetter() {
  return (
    <div className='NL-parent-div'>
        <div className='NL-div-content'>
           <div id='NL-div' className='NL-div-left'>
             <div id='NL-head'>DOWNLOAD THE APP</div>
             <div className='app-container'>
              <div id='app-img-div' className='google-app'></div>
              <div id='app-img-div' className='apple-app'></div>
             </div>
          </div>
          <div id='NL-div' className='NL-div-middle'>
             <div id='NL-head'>FOLLOW US ON</div>
             <div className='icon-container'>
              <div id='app-icon-div'> <FaInstagram id='app-icon'/></div>
              <div id='app-icon-div'><FaXTwitter id='app-icon' /> </div>
              <div id='app-icon-div'> <FaYoutube id='app-icon'/>  </div>
             </div>
          </div>
          <div id='NL-div' className='NL-div-right'>
           <div id='NL-head-div'>
             <div id='NL-head'>SUBSCRIBE TO OUR NEWSLETTER</div> 
       
           </div>
           <div className='NL-input-div'>
         
             <input className='NL-input'/>
             <div className='NL-button'>SUBSCRIBE</div>
           </div>
                
          </div>
       
{/*              <div className='NL-gif-div'><img src='SiteGif/mail-letter.gif' className='NL-gif' /></div> */}

         
   
       
     
    </div>
    </div>
  
  )
}
