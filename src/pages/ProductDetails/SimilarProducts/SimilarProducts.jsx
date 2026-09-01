import React,{useState} from 'react'
import ProductCard from '../../../components/ProductCard'
import StarRating from '../../../components/StarRating'
import ScrollButton from '../../../components/ScrollingButton/ScrollingButton';
import { MdStar} from 'react-icons/md';
import { Link } from 'react-router-dom';
import './SimilarProducts.css'
import { Star } from 'lucide-react';
export default function SimilarProducts({currentCategory,product}) {


  
  return (
     <div className="Product-Details-SimilarProducts">
   <div  id='home-product-head'>
    Similar Products
         <div className="head-dot-wrapper">
      <span className="head-dot red"></span>
      <span className="head-dot blue" ></span>
      <span className="head-dot green"></span>
    
    </div>
    </div>
 <div className="Product-Details-SimilarProducts-list">
        
 {currentCategory ? currentCategory.products.slice(0,5).map((item,index) => 
  item.id !== product.id && (

    <div key={index} className='similar-product'>
      <div className="similar-productImg-wrapper">
   
              <div className='similar-productImg-div'>
     

     <img src={item.images[0]} className='similar-productImg'/> 

      </div>

    {/*    <Link to={`/store/${item.id}`} className='similar-shop-btn-wrapper'>
       <div className="similar-shop-btn">
        <ScrollButton text='Buy Now'/>
       </div>

</Link>  */}
      </div>

      <div className='similar-productDetails-div'>
      
       
              <div className="similar-pd-rating-wrapper">
       <StarRating className='similar-pd-star' color='rgb( 252, 186, 3)' rating={Math.round(item.rating)}/> 
  
                <span className='similar-pd-rating'>({item.rating.toFixed(1)})</span>
                </div>

                  <div className='similar-pd-title'>{item.title}</div>
         
      
          
        
         <span className='similar-pd-price'>${item.price}</span>

      </div>
    </div>
  )
) : 'loading'}
    </div>
 </div>
  )
}
