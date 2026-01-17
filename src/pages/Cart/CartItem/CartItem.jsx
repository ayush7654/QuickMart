import React ,{useState} from 'react'
import './CartItem.css'
import { FiPlus, FiMinus } from "react-icons/fi";
export default function CartItem({index,images,title,price,quantity,shippingInformation,handleRemove}) {

      const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div key={index} className="Cart-item">

          <div className="cart-product-img-div">
          
            


            <img src={images} className="cart-product-img"
                  />
            </div> 


          <div className="cart-product-info-div">
                <div  className="cart-product-info">
        
            <div id='cart-info-item' className="cart-product-title">{title}</div>
            <div id='cart-info-item' className="cart-product-price">Price: ${price}</div>
           <div id='cart-info-item'>{shippingInformation}.</div>
            <div id='cart-info-ite' className="cart-product-quantity">
                 <span className='cart-quantity-button'><FiMinus strokeWidth={1}/></span>
                 <span>{quantity}</span> 
                  <span className='cart-quantity-button'><FiPlus strokeWidth={1}/></span>
                  </div>
          
          <div className="cart-btn">
          <button  id='cartButton' className="cart-remove-btn" onClick={()=>handleRemove(title)}>Remove</button>
                 <button id='cartButton' className="cart-buy-btn">View Details</button>
          </div>
        
          </div>
          </div>
      <div className="cart-btn-ph">
          <button  id='cartButton' className="cart-remove-btn" onClick={()=>handleRemove(title)}>Remove</button>
                 <button id='cartButton' className="cart-buy-btn">View Details</button>
          </div>
           
        </div>
  )
}
