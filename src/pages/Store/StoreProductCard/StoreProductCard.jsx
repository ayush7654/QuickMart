import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { FiBookmark } from 'react-icons/fi'
 import { FaHeart } from 'react-icons/fa';    // Filled heart
import { FiHeart } from 'react-icons/fi';   
import { HiShoppingCart,HiOutlineShoppingCart } from 'react-icons/hi';
import { MdStar, MdStarBorder, MdStarHalf , MdDoneAll, } from 'react-icons/md';
import { MdCheck, MdAddShoppingCart } from "react-icons/md";
import {  MdShoppingCartCheckout } from "react-icons/md";
import { IoCheckmarkDone } from "react-icons/io5";
import { useCartList } from '../../../components/CartListProvider';
import { FaCartPlus , FaMinus} from "react-icons/fa";
import { Plus,Check } from 'lucide-react';

import './StoreProductCard.css'
import AddProductButton from './AddProductButton/AddProductButton';
import StarRating from './../../../components/StarRating';







function StoreProductCard({ product, path }) {

    const { id, images,thumbnail, title,brand , category,  price, rating = 0, discountPercentage } = product;


    const {cartList , updateDataBase } = useCartList()

  const [imageLoaded, setImageLoaded] = useState(false);

  const [productBookmarked, setProductBookmarked] = useState(false);
  const [productWishlisted, setProductWishlisted] = useState(false);

  const [SPImgId,setspImgId] = useState(0)

  const [cursorOnHover , setCursorOnHover] =useState(false);
const isItemInCart = cartList.some(cartItem => cartItem.id === id);
  
const getStatusStyles = (status) => {
  switch (status) {
    case 'In Stock':
      return { opacity:0 };
    case 'Low Stock':
     return { opacity:0 };
    case 'Out of Stock':
      return { backgroundColor: 'rgb(255, 62, 96)', color: '#ffffff' }; // Neutral Grey
    default:
      return { backgroundColor: 'transparent', color: 'inherit',borderColor:'inherit' };
  }
};

const statusStyle = getStatusStyles(product.availabilityStatus);

useEffect(() => {
  let interval;

  if (cursorOnHover && images.length > 0) {
    interval = setInterval(() => {
      setspImgId((prevId) => {
     
        if (prevId >= images.length - 1) {
          return 0;
        }
        return prevId + 1;
      });
    }, 1500);
  } else {
    // Optional: Reset to the first image when the user stops hovering
    setspImgId(0);
  }

  // CLEANUP: This stops the timer when cursorOnHover changes or component dies
  return () => clearInterval(interval);

}, [cursorOnHover, images.length]);




  function handleClickBM(e) {
    e.stopPropagation(); // prevent link click
    e.preventDefault();  // prevent navigation
    setProductBookmarked(prev => !prev);
  }


  
  function handleClickWL(e) {
    e.stopPropagation(); // prevent link click
    e.preventDefault();  // prevent navigation
     setProductWishlisted(prev => !prev);
  }


  return (
   

    <Link to={`/store/${id}`} className='store-ProductCard'
    onMouseEnter={()=>setCursorOnHover(true)}
    onMouseLeave={()=>setCursorOnHover(false)}>
     


        <div className='sp-img-wrapper'>
        

       
  <img
    src={images[0]}
    className={`sp-img base ${cursorOnHover && images.length > 1 ? "fade-out" : ""}`}
  />


  {images.length > 1 && (
    <img
      src={images[1]}
      className={`sp-img top ${cursorOnHover ? "fade-in" : ""}`}
    />
  )}


     
 <div className={`sp-addToCart ${isItemInCart ? 'sp-added-btn' : ''}`}>

 {isItemInCart?<FaCartPlus  className='sp-minus-icon' />:<Plus className='sp-plus-icon'/>}
     
      </div> 

{/*  <div className='productCard-tag sp-brand-tag'> {brand?brand:category} </div> */}
{discountPercentage>15 && <div className='productCard-tag sp-discount-tag'>save {discountPercentage}%</div>}
<div className='productCard-tag sp-status-tag' style={statusStyle}>
  {product.availabilityStatus}
</div>
{/*  <div className='product-color-wrapper'>
              <span className='productCard-color color-1'></span>
              <span className='productCard-color color-2'></span>
              <span className='productCard-color color-3'></span>
              </div>   */} 
        </div>
      

   <div className="store-ProductInfo-wrapper">
        <div className="store-Info-title">{title} </div>

        <div className="productInfo-line2">
          <div className='sp-rating-div'>         
            <MdStar color="rgb(255, 164, 57)" size={16}/> 
                        <span className='rating-num'>{rating.toFixed(1)}</span>
                        <span>(1.2k Reviews)</span>                      
           </div>  

             <div className='sp-price'>${price}</div>
        </div>
        </div>
 
    </Link>
  
  );
}

export default React.memo(StoreProductCard);



