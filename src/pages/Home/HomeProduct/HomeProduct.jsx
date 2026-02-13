import React from 'react'
import './HomeProduct.css'
import IconButton from '../../../components/IconButton/IconButton'
import { HiShoppingCart,HiOutlineShoppingCart } from 'react-icons/hi';
import ScrollButton from '../../../components/ScrollingButton/ScrollingButton';
import { FaCartPlus } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { FaShoppingCart, FaCheck } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";
import { AiOutlineFileDone } from "react-icons/ai";
export default function HomeProduct({images,thumbnail,name,price,tag,discount,brand}) {
  return (
    <div className='home-ProductCard'>
        <div className='hp-img-wrapper'>
            <img src={thumbnail}/>
            <span id='hp-tag' className='hp-tag-new'>New</span>
            <span id='hp-tag' className='hp-tag-discount'>-{discount}%</span>
            <span className='hp-add-btn'> </span>
        </div>
        <div className='hp-info-wrapper'>
            <span className='hp-name'>{name}</span>
            <span className='hp-brand'>{brand}</span>
            <span className='hp-price'>From ${price}</span>
        </div>
        <div className='hp-Add-button'>
       {/*   <IconButton 
         width='100%'
         height='2.5rem'
         text='Add To Cart'
         
         Icon={HiShoppingCart}/> */}
        {/*  <ScrollButton
         text='Add To Cart'
         color='white'
         theme='buttonOutline'
         themeOnHover='buttonFilled'
         textColor='black'
         
         /> */}

      <FaCartPlus size={22}/> 
 
        </div>
    </div>
  )
}
