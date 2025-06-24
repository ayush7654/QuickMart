import {useState,useEffect,useContext,useRef} from "react";
import {useParams,useOutletContext,Link,useLocation} from 'react-router-dom'
import ProductCard from "../../components/ProductCard";

import { useFirebase } from "../../components/FirebaseContext/Firebase";
import CarouselComponent from "../../components/CarouselComponent";

import './ProductDetails.css'
import StarRating from './../../components/StarRating';
export default function ProductDetails(){
    const{id} = useParams()
    const [product,setProduct]= useState(null);
 
    const[currentCategory,setCurrentCategory]= useState(null)    
    
    const [pdColor,setpdColor]= useState('Black')    

    const pdColorArr=[{id:0,colorName:'Black',color:'rgb(0,0,0)'},{id:1,colorName:'Grey',color:'rgb(113, 113, 113)'},{id:2,colorName:'Blue',color:'rgb(0, 61, 130)'},{id:3,colorName:'Red',color:'rgb(135, 0, 0)'}]

     function switchColor(e){
     setpdColor(e)
    }

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


    const firebase= useFirebase()
    const userInfo = firebase.isLoggedIn?firebase.currentUser.email:null
    const location= useLocation()

    const [AddedtoCart,setAddedtoCart]= useState(false)
    const [quantity, setQuantity] = useState(1);
    const handleIncrease = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    


    
  console.log(product)
 
    const updataDataBase=async()=>{

        const productInfo = {
            ...product,
            quantity: quantity
        };
        console.log('this is productInfo',productInfo)
        await firebase.storeDataInFB("users",userInfo,"CartItems",product.title,productInfo)
    }

    const deleteFromDataBase = async () => {
        await firebase.deleteDataInFB("users", userInfo, "CartItems", product.title);
    };
   
    function handleClick() {
        if (AddedtoCart) {
            // If already added to cart, delete it
            deleteFromDataBase();
        } else {
            // If not added, add it to the database
            updataDataBase();
        }
        // Toggle the state
        setAddedtoCart(prev => !prev);
    }

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, '0');       // adds leading 0 if needed
        const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
        const year = date.getFullYear();
      
        return `${day}/${month}/${year}`;
      };
      const formattedDate = formatDate("2024-05-23T08:56:21.623Z");
      console.log('date is ',formattedDate);
     

   
    return(<>
     
    
    <div className="productDetails-div">
        
    {product?<div className="product-detail">


        <CarouselComponent Imagelist={product.images}/> 


        <div className="product-info-div">
         <div className="product-info-pd">
          
           
        <div className="product-title-div" >
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',border:'0px solid red',height:'2rem',width:'100%'}}>
            <div className="pd-brandName"> {product.brand && product.brand} </div>
            <div id='pd-line'></div>
            </div>
          <div className="pd-title">{product.title}</div>
          </div> 
          <div className="product-info-price-div">
        <div className="price-num">${product.price}</div>
        <div  className="product-info-rating-div">
            
            <StarRating rating={product.rating} starSize={30}/>
           
          
        </div>
        </div>


        <div style={{border:'0px solid red'}}>
        
        <div className="product-description" >{product.description}</div>
        </div>

        <div className="pd-colorpick-div">
          <div  className="pd-colorpick-head">COLOR / <span style={{color:'rgb(63, 63, 63)'}}>{pdColor}</span></div>
          <div className="pd-colorpick">

            {pdColorArr.map(item=> <div onClick={()=>switchColor(item.colorName)} className={item.colorName==pdColor?"pd-color-div-selected":"pd-color-div"}><div id="pd-color" style={{backgroundColor:item.color}}></div></div>)}

          </div>
        </div>
       
     
      
        <div className="policy-ship-div" >
           
           
            <div id='pd-subHead' > {product.returnPolicy}</div>
            
           
           
           </div>
           <div id='pd-subHead' >{product.shippingInformation}</div>
           <div id='pd-subHead' style={{display:'flex'}} className="stock-div">
            <div id='pd-subHead' >Stocks left :&nbsp;</div>
        <span style={{fontSize:'1.2rem'}}> {product.stock}</span> </div>
         
         
        <div className="quantity-container-div">
           <div id='pd-subHead' >Select Quantity:</div>
           <div className="quantity-container">
           <div
                className="decrease-btn" 
                onClick={handleDecrease} 
                disabled={quantity === 1}
            >
                -
            </div>
            <input 
                type="text" 
                className="quantity-input" 
                value={quantity} 
                readOnly
            />
            <div className="increase-btn" onClick={handleIncrease}>
                +
            </div>
           </div>
         
          
        </div>
       
        
     
        <div
  className="addTocartBtn" 
  onClick={handleClick}
  style={{ backgroundColor: AddedtoCart ? 'black' : 'rgb(63, 63, 63)' }}
>
  {AddedtoCart ? 'Added to Cart' : 'Add to Cart'}
</div>
     
         </div>
         <div className="review-box" >
           <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}} className="review-box-title">
            <div className="review-head">Top Reviews</div>
            <div style={{width:'70%',height:'.1rem',backgroundColor:'rgb(63, 63, 63)'}}></div>
          </div> 
          
         {product.reviews.map(review=>
         <div className="reviews" >
            <div className="user-review">
              <div>
              <img src='/QMicons/userIconGrey.webp' width='30px'/><span className="reviewer-name">{review.reviewerName}</span>
              </div> 
             
               <div style={{fontSize:'.8rem',color:'rgb(99, 99, 99)'}}>Reviewed on: {formatDate(review.date)}</div>
               </div>
          
            <StarRating rating={review.rating} starSize={20}/>
           
            <div className="review-comment">{review.comment}</div>

            <div className="review-line-div"><div style={{width:'100%',height:'.1rem',backgroundColor:'rgb(151, 151, 151)', marginTop:'2rem'}}></div></div>

         </div>)}
         </div> 


        </div>
        </div>:<p>loading..</p>}

        

        

  
    </div>
 <div className="Product-Details-SimilarProducts">
    <div className="similarProducts-head">Similar Products</div>
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
   
    
    </>
    
        
    )
}




