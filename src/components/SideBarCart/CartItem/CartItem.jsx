import React ,{useEffect, useState} from 'react'
import './CartItem.css'
import { FiPlus, FiMinus } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
export default function CartItem({index,images,title,price,quantity,shippingInformation,discount,handleRemove,updateDataBase}) {

      const [imgLoaded, setImgLoaded] = useState(false);

      const[itemQuantity,setItemQuantity]= useState(quantity)

      const quantityIncrease=()=>{
        setItemQuantity(prev=>prev+1)

      }

    const quantityDecrease = () => {
  setItemQuantity(prev => (prev > 1 ? prev - 1 : prev));
  
};

useEffect(() => {
  if (itemQuantity !== quantity) {
    updateDataBase(title, itemQuantity);
  }
}, [itemQuantity, updateDataBase, title]);

  return (
    <div key={index} className="Cart-item">

          <div className="cart-product-img-div">
          
            


            <img src={images} className="cart-product-img"
                  />
            </div> 


          <div className="cart-product-info-div">
                <div  className="cart-product-info">
        
            <div id='' className="cart-product-title">{title}</div>
           
          
           <div id='cart-info-item'>Color : {index%2===0?'Red':'Black'}</div>
         <div id='cart-info-item'>{shippingInformation}.</div>
            <div id='' className="cart-product-price-div">
               <span className='cart-item-price'> ${price}</span>
            <span className='discount-price'>${(price*((100-discount)/100)).toFixed(2)}</span> 
           
              </div>
           <div className='cart-item-button-wrapper'>
              <div  className="cart-product-quantity">
                 <span className='cart-quantity-button' onClick={quantityDecrease}><FiMinus strokeWidth={1}/></span>
                 <span className='cart-item-quantity' >{itemQuantity}</span> 
                  <span className='cart-quantity-button' onClick={quantityIncrease}><FiPlus strokeWidth={1}/></span>
                  </div>
              <div onClick={()=>handleRemove(title)}><FiTrash2 className='remove-icon' strokeWidth={1.5}/></div>
           </div>
          
          
        {/*   <div className="cart-btn">
          <button  id='cartButton' className="cart-remove-btn" onClick={()=>handleRemove(title)}>Remove</button>
                
          </div> */}
        
          </div>
          </div>
      <div className="cart-btn-ph">
         {/*  <button  id='cartButton' className="cart-remove-btn" onClick={()=>handleRemove(title)}>Remove</button>
                 <button id='cartButton' className="cart-buy-btn">View Details</button> */}
          </div>
           
        </div>
  )
}
