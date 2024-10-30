import React from 'react'
import {Link} from 'react-router-dom'
function ProductCard({id,images,title,price}) {
   
  return (
    <div className="product" key={id} > 
    <Link to ={`/store/${id}`}>
      <img src={images[0]} className='productImg'  alt={title} /> 
     <div style={{lineHeight:'40px'}}>
     <div className='Store-Product-title'>{title}</div> 
     <div className='price-title' style={{color:'black'}}>Price: <span className='product-price' >${price}</span></div>
     </div> 
    
     </Link>

   </div>
  )
}
export default (React.memo(ProductCard))