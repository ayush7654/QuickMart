import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import './SideBarCart.css'
import { X } from 'lucide-react';
import { useCartList } from '../CartListProvider';
import CartItem from './CartItem/CartItem';
import ScrollButton from '../ScrollingButton/ScrollingButton';


export default function SideBarCart({cartToggled,setCartToggled, toggleOverlay}) {



  const { cartList, cartLoading ,totalCost,handleRemove,updateDataBase} = useCartList();


      const cartElements=cartList? (cartList.map((product,index)=>(
     <CartItem
     key={index}
     title={product.title}
     images={product.images[0]}
      price={product.price}
      quantity={product.quantity}
      shippingInformation={product.shippingInformation}
      discount={product.discountPercentage}
      returnPolicy={product.returnPolicy}
      handleRemove={handleRemove}
      updateDataBase={updateDataBase}/>
          ))):<div>loading</div>;


  return (
    <div className='cart-sidebar' 
    style={{
          transform: !cartToggled? 'translateX(0%)' : 'translateX(-100%)',
          transition: 'transform 0.5s ease-in-out',}}
    >

      <div className='cart-sidebar-content'>
        <div className='side-cart-head-div'>
            <div className='side-cart-head-content'>
                 <span className='side-cart-head'>YOUR CART</span>  
                 <span className='side-cart-cancel' onClick={()=>{setCartToggled(false),toggleOverlay(false)}}>
                 <X size={24} strokeWidth={1.5}   />
                 </span>
            </div>  
        </div>

        
        <div className='side-cart-list-wrapper'>
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
           theme='buttonFilled'
           themeOnHover='buttonOutline'
           color='rgb(0,125,255)'

           />
            </Link>
        </div>
      </div>
        

    </div>
  )
}
