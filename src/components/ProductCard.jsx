import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
 import { FaHeart } from 'react-icons/fa';    // Filled heart
import { FiHeart } from 'react-icons/fi';   







import { HiHeart, HiOutlineHeart } from 'react-icons/hi';





function ProductCard({ classname, id, images, title, price, path,discount }) {

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
      <div className="bookmark-logo" onClick={handleClickBM}>
        {productBookmarked ? <BsBookmarkFill color={'rgb(34, 89, 148)'} size={20} /> : <BsBookmark color={'rgb(50, 50, 50)'}  size={20}  />}
      </div>

      <div className='card-tag'>
    Expires In : 2d
      </div>

      <div className='discount-tag'>
       {discount}% Off
      </div>

      <div className='heart-div' onClick={handleClickWL}>
       {productWishlisted? < FaHeart style={{ color: 'rgb(216, 81, 81)', fontSize: '24px' }} />:<FiHeart style={{ color: 'rgb(50, 50, 50)', fontSize: '24px' }} strokeWidth={1}/>}
      </div>



      <Link to={`/store/${id}`} state={path}>
        <div className="productImg-wrapper">
  {!imageLoaded && <div className="image-placeholder" />}
  <img
    src={images[0]}
    className="productImg"
    alt={title}
    style={{ display: imageLoaded ? 'block' : 'none' }}
    onLoad={() => setImageLoaded(true)}
  />
</div>
        <div className='productCard-detail' >
         <div className="Store-Product-title-div"> <div className="Store-Product-title">{title}</div></div>
          <div className="price-div">         
            <span className="product-price">${price}</span>
              <span  className="discount-product-price">${(price*((100-discount)/100)).toFixed(2)}</span>
          </div>
        </div>
      </Link>
      <div className='productcard-links-div'>
        <div id='pd-link' className='pd-AddtoCart' >Add to Cart</div>
        <div  id='pd-link' className='pd-BuyNow'>Buy Now</div>

      </div>
    </div>
  );
}

export default React.memo(ProductCard);
