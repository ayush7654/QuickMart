import React from 'react'
import './IconButton.css'
import { MdArrowOutward } from "react-icons/md";

export default function IconButton({ 
    width = "15rem", 
    height = "3.5rem",
     text = "Explore More" , 
     contentColor='rgb(0,0,0)',
     bgColor='transparent',
     strokeWidth=0,
     Icon =MdArrowOutward
     }) {
  return (
    <div className="Icon-button-wrapper"
   style={{ 
        '--btn-height': height, 
        '--btn-width': width,
          "--btn-content-color": contentColor,
        "--btn-bg-color": bgColor,
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
