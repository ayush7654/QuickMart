import React from 'react'
import './NewsLetter.css'

export default function NewsLetter() {
  return (
    <div className='NL-div'>
       
      <div className='NL-head-div'>
      
        <div className='NL-head'>
          Subscribe to our Newsletter
          
          </div> 
        </div>

          <div className='NL-gif-div'><img src='SiteGif/correo.gif' className='NL-gif' /></div>
   
      <div className='NL-input-div'>
         <input className='NL-input'/>
         <div className='NL-button'>SIGN UP</div>
      </div>
     
    </div>
  )
}
