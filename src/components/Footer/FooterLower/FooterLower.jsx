import React from 'react'
import './FooterLower.css'
import { FaGift, FaQuestionCircle, FaStore,FaMagic   } from "react-icons/fa";
export default function FooterLower() {
  return (
     <div className='footer-lower'>
        
                <div id='footerIcon-div'> 
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

          
        </div>
        
  )
}
