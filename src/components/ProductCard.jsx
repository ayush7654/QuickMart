import React from 'react'
import {Link} from 'react-router-dom'
function ProductCard({classname,id,images,title,price,path}) {
   
  return (
    <div className={classname} key={id}    > 
    <Link to ={`/store/${id}`} state={path}>
      <img src={images[0]} className='productImg'  alt={title} /> 
     <div style={{lineHeight:'30px', backgroundColor:'white'}}>
     <div className='Store-Product-title'>{title}</div> 
     <div className='price-title' ><span className='product-price' >${price}</span></div>
     </div> 
    
     </Link>

   </div>
  )
}
export default (React.memo(ProductCard))