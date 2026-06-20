import React from 'react'
import './CollectionProduct.css'
import { motion } from 'framer-motion';

const imageVariants = {
 hidden: {
scale:2
  },

  visible: {
  
    scale: 1,


    transition: {
      duration: 0.3,
      ease: "linear",
    },
  },
};

export default function CollectionProduct({setHoveredIndex,hoveredIndex,product,index,imgPath}) {

    const {title, price, brand , img1 , img2} = product;
  return (
    <div className='collection-ProductCard'
      onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
     >
        <div className="collection-ProductImg-wrapper" >

       <motion.div className="collection-ProductImg"
        variants={imageVariants}
       style={{ 
          backgroundImage: `url(HomeCollections/${imgPath}/${hoveredIndex === index ? img2 : img1})` 
        }}></motion.div>

        </div>


        <div className="collection-ProductInfo-wrapper">
            <div className="collection-Info-line1">
                <span >{title}</span>
                <span >${price}</span>
            </div>
            <div className='collection-brandname'>{brand}</div>
        </div>

     </div>
  )
}
