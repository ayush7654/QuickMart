import {useState,useEffect,useContext,useRef} from "react";
import {useParams,useOutletContext,Link,useLocation} from 'react-router-dom'

import { useFirebase } from "../../components/FirebaseContext/Firebase";
import CarouselComponent from "../../components/CarouselComponent";

import './ProductDetails.css'
import StarRating from './../../components/StarRating';
export default function ProductDetails(){
    const{id} = useParams()
    const [product,setProduct]= useState(null);
    

    useEffect(()=>{
        fetch(`https://dummyjson.com/products/${id}`)
        .then(res=>res.json())
        .then(data=>(setProduct(data)))
    },[id])
    
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


   
    return(
    <div className="productDetails-page">
        <Link to={`/store${location.state}`} className="backToStore">←</Link>
       
  
    {product?<div className="product-detail">
        <CarouselComponent Imagelist={product.images}/> 
         <div className="product-info">
            {/* to be added : category, stock, dimensions */}
        <div className="product-title"  >{product.title}</div> 
        <div>
        <div style={{fontSize:'1rem',fontWeight:600}}>Description:</div>
        <p className="product-description" >{product.description}</p>
        </div>
       
        <div className="product-info-price-div">
        <div style={{fontSize:'1rem',fontWeight:600}}>Price:</div><div className="price-num">${product.price}</div>
        </div>
        <div  className="product-info-rating-div">
            <div style={{fontSize:'1rem',fontWeight:600}} >Rating:</div>
            <StarRating rating={product.rating}/>
            <div className="rating-num" style={{fontSize:'1rem',fontWeight:600}}><span style={{fontSize:'1.5rem'}}>{product.rating.toFixed(1)}</span>/5</div>
          
        </div>
        <div  style={{display:'flex',flexDirection:'row', alignItems:'center',gap:'10px',paddingTop:'10px'}}>
            <div style={{fontSize:'1rem',fontWeight:600}}>Stocks left:</div>
            <div style={{fontWeight:600}}> {product.stock}</div>
           </div>
        <div style={{display:'flex', justifyContent:'center'}}>
        <div className="quantity-container">
           
            <button 
                className="decrease-btn" 
                onClick={handleDecrease} 
                disabled={quantity === 1}
            >
                -
            </button>
            <input 
                type="text" 
                className="quantity-input" 
                value={quantity} 
                readOnly
            />
            <button className="increase-btn" onClick={handleIncrease}>
                +
            </button>
        </div>
        </div>
     
        <button 
  className="addTocartBtn" 
  onClick={handleClick}
  style={{ backgroundColor: AddedtoCart ? 'black' : '#1a1a1aaf' }}
>
  {AddedtoCart ? 'Added to Cart' : 'Add to Cart'}
</button>
     
         </div>


    
        </div>:<p>loading..</p>}

    
    </div>
        
    )
}