import {useEffect, useState} from "react";
import {useOutletContext,useLocation} from 'react-router-dom'
import { useFirebase } from "../../components/FirebaseContext/Firebase";
import './Cart.css'

export default function Cart(){
    const[cartList,setcartList]= useState([])

    const firebase= useFirebase()
    const userInfo = firebase.isLoggedIn?firebase.currentUser.email:null

    const fetchData=async()=>{
        const cartItem= await firebase.getDataFromFB("users",userInfo,"CartItems")
        cartItem.forEach(item=>setcartList(prev=>[...prev,item.data().Product]))
       
      
    }

   useEffect(()=>{
    fetchData()
   },[])

   const handleRemove = async (productTitle) => {
   
     // Optimistically update the state
     setcartList(prevCartList => prevCartList.filter(product => product.title !== productTitle));
    
     // Delete product from Firestore
    await firebase.deleteDataInFB("users", userInfo, "CartItems", productTitle);
};

 console.log(cartList)
    const cartElements=cartList? (cartList.map((product,index)=>(
        <div key={index} className="Cart-item">
          <div className="cart-product-img"><img src={product.images[0]} width="200px"/></div> 
          <div  className="cart-product-info"> 
            <div className="cart-product-title">{product.title}</div>
            <div className="cart-product-price">Price: ${product.price}</div>
           <div className="cart-product-quantity">Quantity:</div>
          <div className="cart-btn">
          <button className="cart-buy-btn">Buy now</button>
          <button className="cart-remove-btn" onClick={()=>handleRemove(product.title)}>Remove</button>
          </div>
        
          </div>
           
        </div>))):"loading..";
   
    return(<div className="Cart-page-In">

    <div className="cart-item-list">{cartElements}</div>
    <div className="cart-In-BG">
        <div className="checkout-info">
          
        
        <div className="total-cost">Total cost:</div>
        </div>
     
        <button className="checkout-btn">Place order</button>
    </div>
    
    </div>
    
    )
}