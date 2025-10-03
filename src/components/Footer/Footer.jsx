import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom";

import FooterUpper from './FooterUpper/FooterUpper';
import FooterLower from './FooterLower/FooterLower';
import './Footer.css'
export default function Footer() {
  const location = useLocation()
  
  
  return (
    <div className='footer-div'/* style={{display:location.pathname==='/cart'?'none':'block'}} */>
        
      <FooterUpper/>
   {/*    <FooterLower/> */}
       

    </div>
  )
}
