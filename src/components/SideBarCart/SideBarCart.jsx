import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import { useFirebase } from '../FirebaseContext/Firebase';
import './SideBarCart.css'
import { X } from 'lucide-react';
import { useCartList } from '../CartListProvider';
import CartItem from './CartItem/CartItem';
import ScrollButton from '../ScrollingButton/ScrollingButton';
import { div } from 'framer-motion/client';


export default function SideBarCart({cartToggled,setCartToggled,toggleOverlay}) {



  const { cartList, cartLoading ,totalCost,handleRemove,updateDataBase} = useCartList();

  const firebase = useFirebase();


      const cartElements=cartList? (cartList.map((product,index)=>(
  <CartItem
  key={product.id} // Better to use product.id if you have it
  product={product} 
  handleRemove={handleRemove}
  updateDataBase={updateDataBase}
/>
          ))):<div>loading</div>;



  return (
    <div className={`cart-sidebar ${cartToggled?'open':''}`} 


    >

           <div className='side-cart-header'>
          
                 <h2>YOUR CART ({cartElements.length} Items)</h2>  
                 <span className='side-cart-cancel' onClick={()=>{setCartToggled(false),toggleOverlay(false)}}>
                 <X />
                 </span>
          
        </div>
{cartElements.length ?
      <div className='cart-sidebar-content' style={{opacity:cartToggled?1:0}}>
   

        
        <div className='side-cart-list-wrapper' data-lenis-prevent>
             <div className='side-cart-list'>
           {cartElements.length>0 && cartElements }
         </div>
        </div>
        
        <div className='side-cart-checkout-wrapper'>
          <div className='side-cart-subtotal-wrapper'>
            <div>Subtotal</div>
            <div className='subtotal-cost-wrapper'>
              <span className='subtotal-cost'>${totalCost.toFixed(2)} USD</span>
              <span className='subtotal-text'>Shipping & taxes calculated at checkout</span>
            </div>
          </div>
          <Link to='/cart' 
          onClick={()=>{setCartToggled(false),toggleOverlay(false)}} 
          className='side-cart-checkout-btn'>
           
           <ScrollButton
           text='Checkout'
   

           />
            </Link>
        </div>
      </div>:

      <div className='loggedOut-sideCart'>
       <img src='/EmptyCartImg.avif' size={20}/>
        <h2>Your cart is empty.</h2>
        <span>Add products to your cart to start shopping.</span>
        <button  onClick={()=>{setCartToggled(false),toggleOverlay(false)}}>Continue Shopping</button>
      </div>
      }
        

    </div>
  )
}
