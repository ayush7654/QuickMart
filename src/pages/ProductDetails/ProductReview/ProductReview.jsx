import React from 'react'
import './ProductReview.css'
export default function ProductReview({product}) {

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, '0');       // adds leading 0 if needed
        const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
        const year = date.getFullYear();
      
        return `${day}/${month}/${year}`;
      };
      /* const formattedDate = formatDate("2024-05-23T08:56:21.623Z"); */

  return (
       <div className="product-review-box" >
               <div  className="review-box-title">
                <div className="review-head">TOP REVIEWS</div>
                <div className='review-line' ></div>
              </div> 
              
             {product.reviews.map(review=>
             <div className="reviews" >
                <div className="user-review">
                  <div className='username-div'>
                  <img src='/QMicons/userIconGrey.webp' className='review-user-icon' /><span className="reviewer-name">{review.reviewerName}</span>
                  </div> 
                 
                   <div className='user-review-date'>Reviewed on: {formatDate(review.date)}</div>
                   </div>
              
            {/*     <StarRating rating={review.rating} starSize={20}/> */}
               
                <div className="review-comment">{review.comment}
               
                </div>
    
                <div className="review-line-div"></div>
    
             </div>)}
             </div> 
  )
}
