import React from 'react'
import ProductCard from '../../../components/ProductCard'
import './SimilarProducts.css'
export default function SimilarProducts({currentCategory,product}) {
  return (
     <div className="Product-Details-SimilarProducts">
   <div className="home-head-div">
                <div className="home-head-content">
                  <div className='home-head'>SIMILAR PRODUCTS.</div>
                  
                  <div className='home-head-tagline'>Discover Variants.</div>
                </div>
              <div className='home-head-frame'></div>
              </div>
 <div className="Product-Details-SimilarProducts-list">
        
 {currentCategory ? currentCategory.products.slice(0,5).map(item => 
  item.id !== product.id && (
    <ProductCard
      classname='productDetails-product'
      key={item.id}
      id={item.id}
      images={item.images}
      title={item.title}
      price={item.price}
      path={location.search}
    />
  )
) : 'loading'}
    </div>
 </div>
  )
}
