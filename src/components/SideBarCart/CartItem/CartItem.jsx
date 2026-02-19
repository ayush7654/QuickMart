import React ,{useEffect, useState} from 'react'
import './CartItem.css'
import { FiPlus, FiMinus } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
export default function CartItem({product,handleRemove,updateDataBase}) {

  const { 
    id,
    title, 
    images, 
    price, 
    quantity, 
    shippingInformation, 
    returnPolicy, 
    discountPercentage: discount // Alias discountPercentage to discount
  } = product;
      const [imgLoaded, setImgLoaded] = useState(false);

     /* const[itemQuantity,setItemQuantity]= useState(quantity)  */

    const quantityIncrease = () => {
    updateDataBase(product, product.quantity + 1);
  };

  const quantityDecrease = () => {
    if (product.quantity > 1) {
      updateDataBase(product, product.quantity - 1);
    }
  };



/* useEffect(() => {
  if (itemQuantity !== quantity) {
    updateDataBase(product, itemQuantity);
  }
}, [itemQuantity, updateDataBase,product]); */

  return (
    <div key={id} className="Cart-item">

          <div className="cart-product-img-div">
          
            


            <img src={images[0]} className="cart-product-img"
                  />
            </div> 


          <div className="cart-product-info-div">
                <div  className="cart-product-info">
        
            <div id='' className="cart-product-title">{title}</div>
           
          
           <div id='cart-info-item'>Color :   </div>
         <div id='cart-info-item'>{returnPolicy}.</div>
            <div id='' className="cart-product-price-div">
               <span className='cart-item-price'> ${price}</span>
            <span className='discount-price'>${(price*((100-discount)/100)).toFixed(2)}</span> 
           
              </div>
           <div className='cart-item-button-wrapper'>
              <div  className="cart-product-quantity">
                 <span className='cart-quantity-button' onClick={quantityDecrease}><FiMinus strokeWidth={1}/></span>
                 <span className='cart-item-quantity' >{product.quantity}</span> 
                  <span className='cart-quantity-button' onClick={quantityIncrease}><FiPlus strokeWidth={1}/></span>
                  </div>
              <div onClick={()=>handleRemove(title)}><FiTrash2 className='remove-icon' strokeWidth={1.5}/></div>
           </div>
          
          
       
        
          </div>
          </div>
      <div className="cart-btn-ph">
         {/*  <button  id='cartButton' className="cart-remove-btn" onClick={()=>handleRemove(title)}>Remove</button>
                 <button id='cartButton' className="cart-buy-btn">View Details</button> */}
          </div>
           
        </div>
  )
}
