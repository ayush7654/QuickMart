import React from 'react'
import './HomeProduct.css'
import IconButton from '../../../components/IconButton/IconButton'
import { HiShoppingCart,HiOutlineShoppingCart } from 'react-icons/hi';
import ScrollButton from '../../../components/ScrollingButton/ScrollingButton';
import { FaCartPlus } from "react-icons/fa";
import { useCartList } from '../../../components/CartListProvider';
import { Link } from 'react-router-dom';
import TextAnimation from '../../../components/TextAnimation';
import { motion } from 'framer-motion';
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

  const MotionLink = motion(Link); 
  




  return (
    <MotionLink  to={`/store/${product.id}`} 
     initial="hidden" 
    whileHover="visible"
   
    className='home-ProductCard'>
       <div className="test-card"
        style={{backgroundImage:`url(${thumbnail})`}}>
    
      <div className="card-badge">{discount?discount + '% Off':'New'}</div>

        <span className="brand-tag">{brand}</span>

     
      <div
       className="card-glass-content">
       
      </div>

      <div className="card-content">
 <div className="card-header">
          <h2 className="product-title">{name}</h2>
           <span className="price-tag">${price}</span>
        </div>

       
  <div className="product-desc">

      <TextAnimation text={description} delay={0.1} staggerDelay={.01}/>
     </div>

<motion.div
  variants={{
    hidden: { 
      width: "0%", 
      opacity: 0 
    },
    visible: { 
      width: "100%", 
      opacity: 1, 
      transition: { 
        duration: 1.2, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    }
  }}
  style={{
    height: "1px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    /* Center the element so width expansion is symmetrical */
    marginLeft: "auto",
    marginRight: "auto",
    /* The hairline fix */
    scaleY: 0.5,
    /* Ensures the 'growth' logic starts from the middle */
    transformOrigin: "center" 
  }}
/>
      </div>

    </div>
       
    </MotionLink>
  )
}



