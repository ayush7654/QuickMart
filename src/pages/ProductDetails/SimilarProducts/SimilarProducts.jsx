import React,{useState} from 'react'
import ProductCard from '../../../components/ProductCard'
import StarRating from '../../../components/StarRating'
import ScrollButton from '../../../components/ScrollingButton/ScrollingButton';
import { MdStar} from 'react-icons/md';
import { Link } from 'react-router-dom';
import './SimilarProducts.css'
export default function SimilarProducts({currentCategory,product}) {


  
  return (
     <div className="Product-Details-SimilarProducts">
   <div className="sp-head-div">
                
   <div className=''>Similar Products</div>
                  
                  
                
            
              </div>
 <div className="Product-Details-SimilarProducts-list">
        
 {currentCategory ? currentCategory.products.slice(0,window.innerWidth>850?5:4).map((item,index) => 
  item.id !== product.id && (

    <div key={index} className='similar-product'>
      <div className="similar-productImg-wrapper">
   
              <div className='similar-productImg-div'>
     

     <img src={item.images[0]} className='similar-productImg'/> 

      </div>

       <Link to={`/store/${item.id}`} className='similar-shop-btn-wrapper'>
       <div className="similar-shop-btn">
        <ScrollButton text='Shop Now'/>
       </div>

</Link> 
      </div>

      <div className='similar-productDetails-div'>
      
       
              <div className="similar-pd-rating-wrapper">
                <StarRating className='similar-pd-star' color='rgb(0, 0, 0)' rating={Math.round(item.rating)}/>
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
