import React from 'react'
import { Link } from 'react-router-dom'
import './CartOut.css'

export default function CartOut() {
  return (
     <div className="Cart-page-Out" >
      
        <div className="cart-BG">
    
        <div className="cartOut-info">
        <img className="cartOut-img" src='SiteGif/Cart-out-gif.gif' />
            <div className="cartOut-text-1">Missing cart items?</div>
        <div className="cartOut-text-2">Login to see the items you added previously</div>
    <Link to="/login" className="cart-Login-btn"> LOGIN → </Link>
        </div>
        </div>

    </div>
  )
}
