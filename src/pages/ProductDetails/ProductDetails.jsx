import {useState,useEffect,useContext,useRef} from "react";
import {useParams,useOutletContext,Link,useLocation} from 'react-router-dom'
import useProductDetailsData from "./useProductDetailsData";
import ProductInfo from "./ProductInfo/ProductInfo";
import ProductReview from "./ProductReview/ProductReview";
import SimilarProducts from "./SimilarProducts/SimilarProducts";
import { ChevronLeft,ChevronRight } from 'lucide-react'; 
import CarouselComponent from "./CarouselComponent/CarouselComponent";
import Accordion from "./Accordion/Accordion";
import './ProductDetails.css'
import StarRating from './../../components/StarRating';
import CreditComponent from "./CreditComponent/CreditComponent";
export default function ProductDetails(){
    const{id} = useParams()


    const {product,currentCategory} = useProductDetailsData(id)
 

console.log(product)
  console.log('current category' , currentCategory);



    return(
      
  
     <div className="product-page-container">
     <div  className="pd-backButton"><ChevronLeft absoluteStrokeWidth={1.5}/></div> 

     <div className="pd-navBar"> <Link to='/store'>Store&nbsp;</Link>/<span>&nbsp;{product?.title}</span></div>
{ product? <div className="product-page-inner">
    <div className="product-left">
     <CarouselComponent Imagelist={product.images} product={product}/>  
    </div>

    <div className="product-right">
      <div className="info-box">
        <ProductInfo product={product}/>
      </div>
      <div className="credit-box">
     <CreditComponent />
      </div>

   

   <Accordion />

   <div className="product-tags-wrapper">
    <div className="product-sku"> <span id='tag-head'>SKU :</span> {product.sku}</div>
    <div className="product-tags">
     <span id='tag-head'>Tags : </span>
      {product.tags.map((tag, index) => (
  <span className="product-tag" key={index}>
    {tag}{index < product.tags.length - 1 ? ', ' : ''}
  </span>
))}
      </div>
   </div>
    </div>
  </div>:<div>loading</div>}

  <div className="next-section">
<SimilarProducts currentCategory={currentCategory} product={product}/>
  </div>
</div>
        
    )
}


    