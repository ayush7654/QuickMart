import React , {useState} from 'react'
import './IconButton.css'
import { MdArrowOutward } from "react-icons/md";

export default function IconButton({ 
    width = "11rem", 
    height = "2.5rem",
     text = "Explore More" , 
     contentColor='rgb(0,0,0)',
     borderColor='rgba(175, 175, 175, 1)',
     hoverText='black',
     bgColor='transparent',
     state= false,
     strokeWidth=0,
     fontSize='.95rem',
     IconSize='55%',
     IconColor='blue',
     Icon =MdArrowOutward
     }) {


        

  return (
    <div className={`Icon-button-wrapper ${state?'Icon-button-active':''} `}
   style={{ 
        '--btn-height': height, 
        '--btn-width': width,
          "--btn-content-color": contentColor,
        "--btn-bg-color": bgColor,
        "--btn-font-size": fontSize,
        "--btn-icon-size": IconSize,
        "--btn-icon-color": IconColor,
        "--btn-border-color": borderColor,
        "--btn-hoverText-color": hoverText,
        
      }}
   >
     <div className="icon-circle-div" >
    < Icon  className="icon-circle" strokeWidth={strokeWidth} />
    </div> 
    <div className="long-btn">

    </div>
    <div className="button-text">{text}</div>

   </div>
  )
}
