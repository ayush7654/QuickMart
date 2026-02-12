import React from 'react'
import './HomeProduct.css'
import IconButton from '../../../components/IconButton/IconButton'
import { HiShoppingCart,HiOutlineShoppingCart } from 'react-icons/hi';
export default function HomeProduct({images,thumbnail,name,price,tag,discount,brand}) {
  return (
    <div className='home-ProductCard'>
        <div className='hp-img-wrapper'>
            <img src={thumbnail}/>
            <span id='hp-tag' className='hp-tag-new'>New</span>
            <span id='hp-tag' className='hp-tag-discount'>-{discount}%</span>
        </div>
        <div className='hp-info-wrapper'>
            <span className='hp-name'>{name}</span>
            <span className='hp-brand'>{brand}</span>
            <span className='hp-price'>From ${price}</span>
        </div>
        <div className='hp-Add-button'>
         <IconButton 
         width='100%'
         height='2.5rem'
         text='Add To Cart'
         
         Icon={HiShoppingCart}/>

        </div>
    </div>
  )
}
