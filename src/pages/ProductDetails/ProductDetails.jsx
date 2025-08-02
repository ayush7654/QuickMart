import {useState,useEffect,useContext,useRef} from "react";
import {useParams,useOutletContext,Link,useLocation} from 'react-router-dom'

import ProductInfo from "./ProductInfo/ProductInfo";
import ProductReview from "./ProductReview/ProductReview";
import SimilarProducts from "./SimilarProducts/SimilarProducts";

import CarouselComponent from "./CarouselComponent/CarouselComponent";


import './ProductDetails.css'
import StarRating from './../../components/StarRating';
import CreditComponent from "./CreditComponent/CreditComponent";
export default function ProductDetails(){
    const{id} = useParams()
    const [product,setProduct]= useState(null);
 
    const[currentCategory,setCurrentCategory]= useState(null)    


    useEffect(()=>{
        fetch(`https://dummyjson.com/products/${id}`)
        .then(res=>res.json())
        .then(data=>(setProduct(data)))
    },[id])
    
    useEffect(() => {
        if (!product?.category) return; // prevent fetch if category is missing
      
        const fetchProducts = async () => {
          try {
            const response = await fetch(`https://dummyjson.com/products/category/${product.category}`);
            const data = await response.json();
            setCurrentCategory(data);
            console.log('currentCategory products', data);
          } catch (error) {
            console.error('Error fetching category products:', error);
          }
        };
      
        fetchProducts();
      }, [product?.category]);



    const location= useLocation()

 


    


    
  console.log(product);



 
     

/* 


<div className="product-page-container">
  <div className="product-page-inner">
    <div className="product-left">
     <CarouselComponent Imagelist={product.images}/>  
    </div>

    <div className="product-right">
      <div className="info-box">
        <ProductInfo product={product}/>
      </div>

      <div className="review-box">
        <ProductReview product={product}/>
      </div>
    </div>
  </div>

  <div className="next-section">

  </div>
</div> */

   
    return(
      
  
     <div className="product-page-container">
{ product? <div className="product-page-inner">
    <div className="product-left">
     <CarouselComponent Imagelist={product.images}/>  
    </div>

    <div className="product-right">
      <div className="info-box">
        <ProductInfo product={product}/>
      </div>
      <div className="credit-box">
     <CreditComponent/>
      </div>

      <div className="review-box">
        <ProductReview product={product}/>
      </div>
    </div>
  </div>:<div>loading</div>}

  <div className="next-section">
<SimilarProducts currentCategory={currentCategory} product={product}/>
  </div>
</div>
        
    )
}




 {/* <div className="product-details-container">
     
    
    <div className="productDetails-upper">
        
    {product?<div className="product-detail">


       <CarouselComponent Imagelist={product.images}/>  


        <div className="product-info-div">

        <ProductInfo product={product}/>

        <ProductReview product={product}/>

      


        </div>
        </div>:<p>loading..</p>}

        

        

  
    </div>

   
    
    </div> */}
    