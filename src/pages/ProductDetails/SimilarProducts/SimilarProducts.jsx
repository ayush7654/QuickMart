import React from 'react'
import ProductCard from '../../../components/ProductCard'
import StarRating from '../../../components/StarRating'
import './SimilarProducts.css'
export default function SimilarProducts({currentCategory,product}) {
  return (
     <div className="Product-Details-SimilarProducts">
   <div className="sp-head-div">
                
                  <div className='home-heading'>Similar Products.</div>
                  
                  
                
            
              </div>
 <div className="Product-Details-SimilarProducts-list">
        
 {currentCategory ? currentCategory.products.slice(0,window.innerWidth>850?5:4).map(item => 
  item.id !== product.id && (
/*     <ProductCard
      classname='productDetails-product'
      key={item.id}
      id={item.id}
      images={item.images}
      title={item.title}
      price={item.price}
      path={location.search}
    /> */
    <div className='similar-product'>
      <div className='similar-productImg-div'>
        <img src={item.images[0]} className='similar-productImg'/>
      </div>
      <div className='similar-productDetails-div'>
        <div className='similar-productDetails-title'>{item.title}</div>
        <div className='similar-productDetails-price-div'>
          <span>${item.price}</span>
          <span className='similar-productDetails-rating'><StarRating rating={item.rating}/></span>

        </div>
        <div className='similar-productDetails-details'>{item.description}</div>
     
        <div className='similar-productDetails-btn'>View</div>
      </div>
    </div>
  )
) : 'loading'}
    </div>
 </div>
  )
}
