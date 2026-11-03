import React , {useState} from 'react'
import './IconButton.css'
import { MdArrowOutward } from "react-icons/md";
import { FaUser } from 'react-icons/fa';

export default function IconButton({ 
     state= false,
   
 }) {


        

  return (
    <div className={`Icon-button-wrapper ${state?'Icon-button-active':''} `}

   >
     <div className="icon-circle-div" >
       <span className='login-img'><img src="MockDP4.avif" alt="" /></span>
   {/*  < MdArrowOutward  className="icon-circle" strokeWidth={0} size={25} /> */}
    </div> 
    <div className="long-btn">

    </div>
    <div className="button-text">Account</div>

   </div>
  )
}
