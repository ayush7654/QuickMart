import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import TrackingOrder from "./TrackingOrder/TrackingOrder";
import { useFirebase } from "../../components/FirebaseContext/Firebase";
import CartItem from "../../components/SideBarCart/CartItem/CartItem";
import OrderDetails from "./OrderDetails/OrderDetails";
import CartLoading from "./CartLoading/CartLoading";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
import AnimatedUnderline from "../../components/AnimatedUnderline/AnimatedUnderline";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useCartList } from "../../components/CartListProvider";
import './Cart.css'


export default function Cart(){
   

    const [trackerOn,setTrackerOn] = useState(true)
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

    

   <PageHeader
   bgImage='/Cart-head.webp'
   pageHeadText={'Your Cart'}
   pageHeadPara={'Review your selected items, adjust quantities, and get ready to check out securely.'}/>

        <div className="Cart-page-wrapper">



       <div className="cart-page-left">
       
    <div className="cart-page-left-head">
      <span>SHIPPING DETAILS</span>
      </div>
 <CheckoutForm/>



       </div>
   

<div className="cart-page-right">
  
    <OrderDetails
   cartElements={cartElements}
   cartList={cartList}
   totalCost={totalCost}
   />
</div>

    
    </div>

    </div>

    
    )
}




