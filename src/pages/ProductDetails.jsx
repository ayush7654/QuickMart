import {useState,useEffect,useContext,useRef} from "react";
import {useParams,useOutletContext,Link,useLocation} from 'react-router-dom'
import { BreadCrumbContext } from "../App";
import { useFirebase } from "../components/FirebaseContext/Firebase";
import CarouselComponent from "../components/CarouselComponent";
export default function ProductDetails(){
    const{id} = useParams()
    const [product,setProduct]= useState(null)

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

    

    const[BreadCrumbs,setbreadcrumbs]= useContext(BreadCrumbContext)
    
  

    const updataDataBase=async()=>{
        await firebase.storeDataInFB("users",userInfo,"CartItems",product.title,product)
    }
   
    function handleClick(){
    
        updataDataBase();
   
    }
    console.log(location)
   
    return(
    <div>
       
   {/* <Link onClick={()=>setbreadcrumbs("STORE")} to={`/store?${location.state.search}` }>Back to Store</Link> */}
    {product?<div className="product-detail">
        <CarouselComponent Imagelist={product.images}/> 
         <div className="product-info">
            {/* to be added : category, stock, dimensions */}
        <h2  style={{fontSize:'30px'}}>{product.title}</h2> 
        <h3>Description:</h3>
        <p style={{fontSize:'18px', lineHeight:'25px',width:'450px'}}>{product.description}</p>
        <div className="product-info-price-div">
        <h4>Price:</h4><h2>${product.price}</h2>
        </div>
        <div  className="product-info-rating-div">
            <h4 >Rating:</h4>
            <h2>{product.rating.toFixed(1)}/5</h2>
        </div>
        <div style={{display:'flex',flexDirection:'row', alignItems:'center',gap:'10px'}}>
            <h4>Stocks left:</h4>
            <h3> {product.stock}</h3>
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
     
        {!AddedtoCart?<button className="addTocartBtn" onMouseDown={()=>setAddedtoCart(true)} onClick={handleClick}>Add to Cart</button>:<button className="addTocartBtn" style={{backgroundColor:'black'}} onMouseDown={()=>setAddedtoCart(false)}>Added to Cart</button>}
         </div>

    
        </div>:<p>loading..</p>}

    
    </div>
        
    )
}