import {useEffect, useState} from "react";

import { useFirebase } from "../../components/FirebaseContext/Firebase";
import './Cart.css'

export default function Cart(){
    const[cartList,setcartList]= useState([])
    const [totalCost, setTotalCost] = useState(0); // Initialize total cost state

    const firebase= useFirebase()
    const userInfo = firebase.isLoggedIn?firebase.currentUser.email:null

    const fetchData=async()=>{
        const cartItem= await firebase.getDataFromFB("users",userInfo,"CartItems")
        cartItem.forEach(item=>setcartList(prev=>[...prev,item.data().Product]))
       
      
    }

    const calculateTotalCost = () => {
        const total = cartList.reduce((acc, item) => {
          return acc + item.price * item.quantity;
        }, 0);
        setTotalCost(total);
        console.log("Total Cost:", total);
      };

   

  

   useEffect(()=>{
    fetchData()

   },[])

   useEffect(() => {
    calculateTotalCost();
  }, [cartList]); // Recalculate total cost whenever cartList changes


   const handleRemove = async (productTitle) => {
   
     // Optimistically update the state
     setcartList(prevCartList => prevCartList.filter(product => product.title !== productTitle));
    
     // Delete product from Firestore
    await firebase.deleteDataInFB("users", userInfo, "CartItems", productTitle);
};

    const cartElements=cartList? (cartList.map((product,index)=>(
        <div key={index} className="Cart-item">
          <div className="cart-product-img"><img src={product.images[0]} width="250px"/></div> 
          <div className="cart-product-info-div">
                <div  className="cart-product-info">
        
            <div className="cart-product-title">{product.title}</div>
            <div className="cart-product-price">Price: ${product.price}</div>
           <div className="cart-product-quantity">Quantity: {product.quantity}</div>
           <div>{product.shippingInformation}.</div>
          <div className="cart-btn">
          <button  id='cartButton' className="cart-remove-btn" onClick={()=>handleRemove(product.title)}>Remove</button>
                 <button id='cartButton' className="cart-buy-btn">View Details</button>
          </div>
        
          </div>
          </div>
      
           
        </div>))):"loading..";
   
    return(<div className="cart-page">
      <div className="cart-page-title"><div className="cart-page-heading">YOUR CART.</div></div>
          <div className="Cart-page-In">

    <div className="cart-item-list">{cartElements}</div>

    <div className="order-summary-div">
      <div className="order-summary-title">Order Summary</div>
      <div className="order-list">
        {cartList.map(item=><div className="order-list-item">
          <div id='order-item'>{item.title} x {item.quantity}</div>
          <div id='order-item'>${item.price * item.quantity}</div>
   
        </div>)}
       
      </div>
        
      <div className="total-cost"><span>Total Cost</span> <span>${totalCost.toFixed(2)}</span></div>
        <button className="checkout-btn">Place Order</button>
    </div>
    
    </div>
    </div>

    
    )
}