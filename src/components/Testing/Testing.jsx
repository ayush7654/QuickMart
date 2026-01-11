import React, {useState} from 'react'
import './Testing.css'
import MenuCancel from '../MenuCancel/MenuCancel';
import { HiShoppingBag  } from "react-icons/hi2";

import { MdArrowUpward, MdArrowDownward } from "react-icons/md";
import { HiArrowUp, HiArrowDown } from "react-icons/hi";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

import { BsCaretUpFill, BsCaretDownFill } from "react-icons/bs";
import { IoCaretUp, IoCaretDown } from "react-icons/io5";

import { NavLink } from 'react-router-dom';
import BracketButton from '../BracketButton/BracketButton';
import ScrollButton from '../ScrollingButton/ScrollingButton';
export default function Testing() {

  const buttomElement= <div> <HiShoppingBag/> Add to cart</div>


  return (
    <div className='testing-div'>

      <div className='test-header'>
        SAARAS
      </div>



<div id='div-test' className='test-heading1'>
  <span>Main Head</span>  <span>SAARAS</span>
</div>
<div id='div-test' className='test-heading2'>
  <span>Sub Head</span>  <span>SUB HEAD</span>
  </div>
<div id='div-test' className='test-text'>
  <span>this is the transform property applied to the header of my website , i want it to be different for different pages , should i create an array with all pages and the % i want the header to move on that page and then use that in the property?</span>  <span>PARA TEXT</span></div>
<div id='div-test' className='test-link'>
  <span id='link-div'>Add to Cart</span>  <span id='link-div'>ADD TO CART</span></div>
<div id='div-test' className='test-button'>
  <span>Button</span>  <span>BUTTON</span></div>




<div className="container">
      <div className="bracket-card">
        {/* Corner Brackets */}
        <div className="corner top-left"></div>
        <div className="corner top-right"></div>
        <div className="corner bottom-left"></div>
        <div className="corner bottom-right"></div>
        
        <span className="text-content">MEET THE TEAM</span>
      </div>
    </div>







    </div>
  )
}