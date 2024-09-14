import React from 'react'
import {Link} from 'react-router-dom'
function ProductCard({id,images,title,price}) {
   
  return (
    <div className="product" key={id}  /* 
    onClick={()=>handleBreadCrumb(product.category,product.title)} */> 
    <Link to ={`/store/${id}`} 
   /*  state={{search:searchParams.toString()} } */>
      <img src={images[0]} width="200px" height="75%" alt={title} /> 
     <div style={{lineHeight:'40px'}}>
     <div className='Store-Product-title'>{title}</div> 
     <div style={{color:'black'}}>Price: <span style={{fontWeight:700,fontSize:'20px'}}>${price}</span></div>
     </div> 
    
     </Link>

   </div>
  )
}
export default (React.memo(ProductCard))