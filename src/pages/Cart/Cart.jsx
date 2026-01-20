import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import TrackingOrder from "./TrackingOrder/TrackingOrder";
import { useFirebase } from "../../components/FirebaseContext/Firebase";
import CartItem from "../../components/SideBarCart/CartItem/CartItem";
import OrderDetails from "./OrderDetails/OrderDetails";
import CartLoading from "./CartLoading/CartLoading";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
import AnimatedUnderline from "../../components/AnimatedUnderline/AnimatedUnderline";
import { useCartList } from "../../components/CartListProvider";
import './Cart.css'


export default function Cart(){
   

    const [trackerOn,setTrackerOn] = useState(false)
    const [totalCost, setTotalCost] = useState(0); // Initialize total cost state

      const { cartList, cartLoading ,handleRemove} = useCartList();
  


  


    const firebase= useFirebase()
    const userInfo = firebase.isLoggedIn?firebase.currentUser.email:null




    const calculateTotalCost = () => {
        const total = cartList.reduce((acc, item) => {
          return acc + item.price * item.quantity;
        }, 0);
        setTotalCost(total);
        console.log("Total Cost:", total);
      };

   

   useEffect(() => {
    calculateTotalCost();
  }, [cartList]); // Recalculate total cost whenever cartList changes



    const cartElements=cartList? (cartList.map((product,index)=>(
   <CartItem
   index={index}
   title={product.title}
   images={product.images[0]}
    price={product.price}
    quantity={product.quantity}
    shippingInformation={product.shippingInformation}
    handleRemove={handleRemove}/>
        ))):<div>loading</div>;


    
        if (cartLoading) {
  return <CartLoading />; // your silhouette page
}
   
    return(<div className="cart-page">

       <div className="page-head-div"  
         style={{
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5)), url('/Cart-head.webp')"
  }}>
    <div className="page-head">YOUR CART</div>
    <div className="page-head-description">
Review your selected items, adjust quantities, and get ready to check out securely.
    </div>

   </div>



        <div className="Cart-page-In">

   {/* <div className="cart-item-list">{cartElements}</div> */}
       {/*  <TrackingOrder/> */}

       <div className="cart-page-left">
        <div className="cart-page-In-content-head-div">
          <div onClick={()=>setTrackerOn(false)} 
          className={`cart-content-head ${trackerOn?'':'cart-head-selected'}`}>
           <AnimatedUnderline from="center" offset={0}>
            <span className='cart-head-text'>CART ITEMS</span>
            </AnimatedUnderline> 
            </div>
          <span style={{fontSize:'2rem', color:'rgb(180,180,180)'}}>|</span>
          <div onClick={()=>setTrackerOn(true)} 
          className={`cart-content-head ${trackerOn?'cart-head-selected':''}`}>
            <AnimatedUnderline from="center" offset={0}>
               <span className='cart-head-text' >TRACK ORDER</span>
            </AnimatedUnderline>
            
            </div>
        </div>
    <div style={{ display: trackerOn ? "block" : "none" }}>
 {/*  <TrackingOrder /> */}
 <CheckoutForm/>
</div>

<div style={{ display: trackerOn ? "none" : "block" }}>
 {cartElements.length>0? 
 <div className="cart-item-list">{cartElements}</div>
:
    <div className="empty-cart">
      <img className="emptyCart-img" src='SiteGif/shopping-cart.gif' />
      <div className="emptyCart-text1">Your cart is empty, let's change that.</div>
      <Link to='/store' className="cart-store-button">Store</Link>
      </div>}
</div>
       </div>
   


      
{/* <div className="Cart-page-In-midline"></div> */}

<div className="order-details-div">
  
    <OrderDetails
   cartElements={cartElements}
   cartList={cartList}
   totalCost={totalCost}
   />
</div>

    
    </div>

   {/* <div className="Cart-page-In-empty">
   <div className="empty-cart">
      <img className="emptyCart-img" src='SiteGif/shopping-cart.gif' />
      <div className="emptyCart-text1">Your cart is empty, let's change that.</div>
      <Link to='/store' className="cart-store-button">Store</Link>
      </div>
    </div>  */}

 
   
    </div>

    
    )
}




