import React from 'react'
import './HomeProduct.css'
import IconButton from '../../../components/IconButton/IconButton'
import { HiShoppingCart,HiOutlineShoppingCart } from 'react-icons/hi';
import ScrollButton from '../../../components/ScrollingButton/ScrollingButton';
import { FaCartPlus } from "react-icons/fa";
import { useCartList } from '../../../components/CartListProvider';

import { Link } from 'react-router-dom';
export default function HomeProduct({ product, path }) {

  const { 
    id, 
    thumbnail, 
    name, 
    price, 
    brand, 
    images, 
    description, 
    discount 
  } = product;

  


console.log(images)
  return (
    <div className='home-ProductCard'>
       <div className="test-card" style={{backgroundImage:`url(${thumbnail})`}}>
    
      <div className="card-badge">{discount?discount + '% Off':'New'}</div>

        <span className="brand-tag">{brand}</span>

     
      <div className="card-glass-content">
       
      </div>

      <div className="card-content">
 <div className="card-header">
          <h2 className="product-title">{name}</h2>
           <span className="price-tag">${price}</span>
        </div>

         <div className="product-desc">
          {description}
        </div> 

        <div className="tag-row">
        {/*  */}
      
         
      
         {/*  <span className="info-tag">9 left</span> */}
        </div>

   {/*      <button className="add-to-cart-btn">Add To Cart</button> */}
        <Link to={`/store/${id}`} className='hp-addCart-wrapper'>
          <ScrollButton
          className='hp-addCart'
          text='View Details'
          theme='buttonFilled'
          themeOnHover='buttonOutline'
        
          />
        </Link>
      </div>
    </div>
       
    </div>
  )
}



