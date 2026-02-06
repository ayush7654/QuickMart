import React from 'react'
import './ProductReview.css'
import useProductDetailsData from '../useProductDetailsData';
import StarRating from '../../../components/StarRating';
import { useParams } from 'react-router-dom';
import CornerImgWrapper from '../CornerImgWrapper/CornerImgWrapper';
export default function ProductReview() {


    const{id} = useParams()


    const {product,currentCategory} = useProductDetailsData(id)

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, '0');       // adds leading 0 if needed
        const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
        const year = date.getFullYear();
      
        return `${day}/${month}/${year}`;
      };


      const MockUsers = [
        {id:1, img:'/MockDP1.jpg'},
        {id:2, img:'/MockDP4.avif'},
        {id:3, img:'/MockDP5.jpg'},
        {id:4, img:'/MockDP6.jpg'},
        {id:5, img:'/MockDP3.jpg'},

      ]

  return (
       <div className="product-review-box" >
              
               
             {product?.reviews.map((review,index)=>
             <div className={`reviews ${index < product.reviews?.length-1?' ':'end-review'}`} >
             <div className='user-img-wrapper'>
            
       
  <div className='user-img-div'>
               
               <img src={MockUsers[index]?.img}/>
             </div> 
            
             
          
            
             </div>
             <div className='user-info-wrapper'>
              <div className='name-date-wrapper'>
                <span className='review-username'>{review.reviewerName}</span>
                <span className='review-date'> {formatDate(review.date)}</span>
              </div>
              <div>
               <StarRating rating={review.rating}/> 
              </div>
              <div className='user-comment'>{review.comment}</div>
             </div>
    
             </div>)}
             </div> 
  )
}
