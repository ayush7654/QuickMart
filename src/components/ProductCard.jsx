import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { FiBookmark } from 'react-icons/fi'
 import { FaHeart } from 'react-icons/fa';    // Filled heart
import { FiHeart } from 'react-icons/fi';   
import { HiShoppingCart,HiOutlineShoppingCart } from 'react-icons/hi';
import { MdStar, MdStarBorder, MdStarHalf } from 'react-icons/md';
import AnimatedUnderline from './AnimatedUnderline/AnimatedUnderline';
import BracketButton from './BracketButton/BracketButton';
import ScrollButton from './ScrollingButton/ScrollingButton';
import IconButton from './IconButton/IconButton';






function ProductCard({ classname, id, images, title, price, path,discount, rating=0 }) {

  const [imageLoaded, setImageLoaded] = useState(false);

  const [productBookmarked, setProductBookmarked] = useState(false);
  const [productWishlisted, setProductWishlisted] = useState(false);


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
    <div className={classname} key={id}>
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

    </div>
  );
}

export default React.memo(ProductCard);
