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
import { FaCartPlus } from "react-icons/fa";
import './StoreProductCard.css'






function StoreProductCard({ product, path }) {

    const { id, images,thumbnail, title, price, rating = 0, discount } = product;


    const {cartList , updateDataBase } = useCartList()

  const [imageLoaded, setImageLoaded] = useState(false);

  const [productBookmarked, setProductBookmarked] = useState(false);
  const [productWishlisted, setProductWishlisted] = useState(false);

  const [SPImgId,setspImgId] = useState(0)

  const [cursorOnHover , setCursorOnHover] =useState(false)
const isItemInCart = cartList.some(cartItem => cartItem.id === id);
  

useEffect(() => {
  let interval;

  if (cursorOnHover && images.length > 0) {
    interval = setInterval(() => {
      setspImgId((prevId) => {
        // If we reach the end of the array, go back to 0
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

console.log('cart list is',cartList)


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
            <img src={images[SPImgId]}/>

              <div className='sp-imgBar-wrapper'>
  {images.map((_, index) => (
    <div key={index} className='sp-imgBar'>
      <div 
        className={`sp-imgBar-progress ${
          cursorOnHover && index === SPImgId ? 'active' : ''
        } ${
          cursorOnHover && index < SPImgId ? 'filled' : ''
        }`}
      />
    </div>
  ))}
</div>
<div className={`sp-addToCart ${isItemInCart ? 'sp-added-btn' : ''}`}>
        {isItemInCart ?
         <span className='sp-btn-content'>
          <MdDoneAll size={18}/>
          Added To Cart
          </span> :
          <span className='sp-btn-content'><FaCartPlus/> Add To Cart</span> }
      </div>
        </div>
        <div className='sp-info-wrapper'>
            <div className='sp-info-line1'>
                 <span>{title}</span> 
          
            </div>

            <div className='sp-info-line2'>
              <span className='sp-price'>From ${price}</span>
                <div className='sp-rating-div'>
                    <span>{rating.toFixed(1)}</span>
                       <MdStar  color='rgba(235, 235, 0, 1)'  />
               </div> 
               
            </div>
           
        </div>
    </Link>
  
  );
}

export default React.memo(StoreProductCard);



 {/* <div  classname="store-product" key={id}>
    {!imageLoaded && <div  className="image-placeholder" ></div>}



      <Link to={`/store/${id}`} state={path}>

        <div className="productImg-wrapper">

  <div className='productImg-container'>
    <img
    src={images[0]}
    className="productImg"
    alt={title}
    style={{ display: imageLoaded ? 'block' : 'none' }}
    onLoad={() => setImageLoaded(true)}
  /> 
  </div>

   
</div>
        <div className='productCard-detail' >
         <div className="Store-Product-title-div"> <div className="Store-Product-title">{title}</div></div>
          <div className="price-div"> 
              <div className="product-price">${price}</div>
                     
               <div className='productCard-rating-div'>
                 <span>{rating.toFixed(1)}</span>
                     <div className="productCard-star-wrapper">
                      <MdStarBorder className="productCard-star empty" />
                      <MdStar className="productCard-star filled" />
                      </div>
                </div>

          </div>
        </div>
      </Link>

    </div>  */}