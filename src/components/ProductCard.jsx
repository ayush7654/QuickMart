import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
 import { FaHeart } from 'react-icons/fa';    // Filled heart
import { FiHeart } from 'react-icons/fi';   







import { HiHeart, HiOutlineHeart } from 'react-icons/hi';





function ProductCard({ classname, id, images, title, price, path,discount }) {
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
      <div className="bookmark-logo" onClick={handleClickBM}>
        {productBookmarked ? <BsBookmarkFill color={'rgb(43, 43, 43)'} size={20} /> : <BsBookmark color={'gray'}  size={20}  />}
      </div>

      <div className='card-tag'>
    Expires In : 2d
      </div>

      <div className='discount-tag'>
       {discount}% Off
      </div>

      <div className='heart-div' onClick={handleClickWL}>
       {productWishlisted? < FaHeart style={{ color: 'rgb(255, 91, 91)', fontSize: '24px' }} />:<FiHeart style={{ color: 'gray', fontSize: '24px' }} strokeWidth={1}/>}
      </div>



      <Link to={`/store/${id}`} state={path}>
        <img src={images[0]} className="productImg" alt={title} />
        <div className='productCard-detail' style={{ lineHeight: '2rem'}}>
          <div className="Store-Product-title">{title}</div>
          <div className="price-div">
            <span className="product-price">${price}</span>
            <span  className="discount-product-price">${(price*((100-discount)/100)).toFixed(2)}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default React.memo(ProductCard);
