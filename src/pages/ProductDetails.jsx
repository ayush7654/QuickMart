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
            
        <h2  style={{fontSize:'30px'}}>{product.title}</h2> 
        <h3 >Description:</h3>
        <p  style={{fontSize:'18px', lineHeight:'25px',width:'450px'}}>{product.description}</p>
        <div className="product-info-price-div">
        <h3>Price:</h3><h2>${product.price}</h2>
        </div>
        <div  className="product-info-rating-div">
            <h3 >Rating:</h3>
            <h2>{product.rating.toFixed(1)}/5</h2>
        </div>
     
        <button className="addTocartBtn" onClick={handleClick}>Add to Cart</button>
         </div>

    
        </div>:<p>loading..</p>}

    
    </div>
        
    )
}