import React from 'react'
import './HomeProduct.css'
import IconButton from '../../../components/IconButton/IconButton'
import { HiShoppingCart,HiOutlineShoppingCart } from 'react-icons/hi';
import ScrollButton from '../../../components/ScrollingButton/ScrollingButton';
import { FaCartPlus } from "react-icons/fa";

import { Link } from 'react-router-dom';
export default function HomeProduct({images,thumbnail,name,price,tag,discount,brand,id,description}) {


console.log(images)
  return (
    <div className='home-ProductCard'>
        <div className='hp-tag-wrapper'>
           <span className='hp-brand'>{brand}</span>
             <span id='hp-tag' className='hp-tag-new'>New</span>
            <span id='hp-tag' className='hp-tag-discount'>-{discount}%</span>
        </div>

        <Link to={`/store/${id}`} className='hp-content-wrapper'>
             <div className='hp-img-wrapper'>
         
          <div className='hp-flipper'>
    {/* FRONT SIDE */}
    <div className='hp-front'>
      <img src={thumbnail} alt={name} />
    </div>

    {/* BACK SIDE */}
    <div className='hp-back'>
      <p className='hp-description'>{description}</p>
      <span className='hp-back-btn'>View Details</span>
    </div>
  </div>
          
        </div>
        </Link>
        
       
        <div className='hp-info-wrapper'>
            <span className='hp-name'>{name} {id}</span>
           {/*  <span className='hp-brand'>{brand}</span> */}
            <span className='hp-price'>From ${price}</span>
             <div className='hp-Add-button'>
    
      <FaCartPlus size={22} className='hp-cart-icon'/> 
 
        </div>
        </div>
       
    </div>
  )
}
