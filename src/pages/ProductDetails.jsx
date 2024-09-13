import {useState,useEffect,useContext,useRef} from "react";
import {useParams,useOutletContext,Link,useLocation} from 'react-router-dom'
import { BreadCrumbContext } from "../App";
import { useFirebase } from "../components/FirebaseContext/Firebase";
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
    <>
   <Link onClick={()=>setbreadcrumbs("STORE")} to={`/store?${location.state.search}` }>Back to Store</Link>
    {product?<div className="product-detail">
         <div>{product.images.map((pic,index)=><img key={index} src={pic} width='300px'/>)}</div> 
         <div>
            
        <h2>{product.title}</h2> 
        <h4>Description:</h4><p>{product.description}</p>
        <h2>Price: ${product.price}</h2>
        <h4>Rating:{product.rating}/5</h4>
        <button onClick={handleClick}>Add to Cart</button>
         </div>

    
        </div>:<p>loading..</p>}
    
    </>
        
    )
}