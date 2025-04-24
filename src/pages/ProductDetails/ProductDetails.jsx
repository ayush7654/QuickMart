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
    const[categories,setCategories]= useState(null)
    const[currentCategory,setCurrentCategory]= useState(null)                              
    

    useEffect(()=>{
        const fetchCategory= async()=>{
        const response= await fetch("https://dummyjson.com/products/categories")
        const data = await response.json()
        setCategories(data)
      
        }
        fetchCategory();
        },[])


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
    {window.innerWidth>550 && <div className="productDetails-nav-container">
     <div className="productDetails-nav">  
    <Link to={`/store${location.state?location.state:'?page=1'}`} className="backToStore">←</Link> 
    {categories?categories.slice(12,20).map(item=><Link to={`/store?type=${item.slug}`}  className="productDetails-nav-item">{item.name}</Link>):<div>loading</div>}
    </div>
     </div>}
    
    <div className="productDetails-div">
        
    {product?<div className="product-detail">


        <CarouselComponent Imagelist={product.images}/> 


        <div className="product-info-div">
         <div className="product-info-pd">
          
            {/* to be added : category, stock, dimensions */}
        <div className="product-title"  ><div style={{fontSize:'.7rem',marginLeft:'0rem',color:'white'}}><span style={{backgroundColor:'rgb(68, 64, 64)',padding:'.2rem'}}>{product.brand && product.brand}</span></div>{product.title}</div> 
        <div>
        <div id='pd-subHead'>Description:</div>
        <p className="product-description" >{product.description}</p>
        </div>
       
        <div className="product-info-price-div">
        <div  id='pd-subHead'>Price:</div><div className="price-num">${product.price}</div><div></div>
        </div>
        <div  className="product-info-rating-div">
            <div id='pd-subHead' >Rating:</div>
            <StarRating rating={product.rating}/>
            <div className="rating-num" id='pd-subHead'><span style={{fontSize:'1.5rem'}}>{product.rating.toFixed(1)}</span>/5</div>
          
        </div>
        <div className="policy-ship-div" >
           
           
            <div id='pd-subHead'> {product.returnPolicy}</div>
            
            <div id='pd-subHead'>{product.shippingInformation}</div>
           
           </div>
           <div id='pd-subHead' style={{display:'flex'}} className="stock-div">
            <div id='pd-subHead'>Stocks left :</div>
        <span>{product.stock}</span> </div>
         
         
        <div className="quantity-container-div">
           <div id='pd-subHead'>Select Quantity:</div>
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
  style={{ backgroundColor: AddedtoCart ? 'black' : '#1a1a1aaf' }}
>
  {AddedtoCart ? 'Added to Cart' : 'Add to Cart'}
</div>
     
         </div>
         <div className="review-box" ><span style={{fontWeight:700}}>Top Reviews</span>
         {product.reviews.map(review=>
         <div className="reviews" >
            <div className="user-review">
              <div style={{display:'flex',gap:'.4rem', alignItems:'center'}}>
              <img src='/userIcon.png' width='40px'/>{review.reviewerName}
              </div>
             
               <div style={{fontSize:'.9rem',color:'rgb(85, 81, 81)'}}>Reviewed on: {formatDate(review.date)}</div>
               </div>
          
            <StarRating  rating={review.rating}/>
           
            <div>{review.comment}</div>

         </div>)}
         </div> 


        </div>
        </div>:<p>loading..</p>}

        

        

  
    </div>
 <div className="Product-Details-SimilarProducts">
    <div className="similarProducts-head">Similar Products</div>
 <div className="Product-Details-SimilarProducts-list">
        
 {currentCategory ? currentCategory.products.map(item => 
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




