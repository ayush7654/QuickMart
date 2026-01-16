import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import TrackingOrder from "./TrackingOrder/TrackingOrder";
import { useFirebase } from "../../components/FirebaseContext/Firebase";
import CartItem from "./CartItem/CartItem";
import OrderDetails from "./OrderDetails/OrderDetails";
import CartLoading from "./CartLoading/CartLoading";
import AnimatedUnderline from "../../components/AnimatedUnderline/AnimatedUnderline";
import './Cart.css'


export default function Cart(){
    const[cartList,setcartList]= useState([])

    const [trackerOn,setTrackerOn] = useState(false)
    const [totalCost, setTotalCost] = useState(0); // Initialize total cost state

    const [cartLoading, setCartLoading] = useState(true); // true while fetching


  


    const firebase= useFirebase()
    const userInfo = firebase.isLoggedIn?firebase.currentUser.email:null

const fetchData = async () => {
  setCartLoading(true); // start loading
  try {
    const cartItem = await firebase.getDataFromFB("users", userInfo, "CartItems");

    cartItem.forEach(item =>
      setcartList(prev => [...prev, item.data().Product])
    );
  } catch (err) {
    console.error("Failed to fetch cart items:", err);
  } finally {
    setCartLoading(false); // done loading
  }
};


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
   <CartItem
   index={index}
   title={product.title}
   images={product.images[0]}
    price={product.price}
    quantity={product.quantity}
    shippingInformation={product.shippingInformation}
    handleRemove={handleRemove}/>
        ))):<div>loading</div>;

        console.log('list is',cartElements.length)
    
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

       <div className="cart-page-In-content">
        <div className="cart-page-In-content-head-div">
          <div onClick={()=>setTrackerOn(false)} 
          className={`cart-content-head ${trackerOn?'':'cart-head-selected'}`}>
           <AnimatedUnderline from="center" offset={0}>
            <span className='cart-head-text'>Cart Items</span>
            </AnimatedUnderline> 
            </div>
          <span style={{fontSize:'2rem'}}>|</span>
          <div onClick={()=>setTrackerOn(true)} 
          className={`cart-content-head ${trackerOn?'cart-head-selected':''}`}>
            <AnimatedUnderline from="center" offset={0}>
               <span className='cart-head-text' >Track Order</span>
            </AnimatedUnderline>
            
            </div>
        </div>
    <div style={{ display: trackerOn ? "block" : "none" }}>
  <TrackingOrder />
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
   


      
<div className="Cart-page-In-midline"></div>


  <OrderDetails
   cartElements={cartElements}
   cartList={cartList}
   totalCost={totalCost}
   />
    
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




