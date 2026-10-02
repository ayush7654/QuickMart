import React from 'react'
import './HeaderBar.css'
export default function HeaderBar() {
  return (
    <div className="header-bar">
    <div className="bar-track">
        <div className="bar-content">
            <span>FREE DELIVERY FOR ORDERS ABOVE $100</span>
            <span>✦</span>
            <span>NEW ARRIVALS EVERY WEEK</span>
            <span>✦</span>
            <span>SHOP THE LATEST COLLECTION</span>
            <span>✦</span>
        </div>

        <div className="bar-content" aria-hidden="true">
            <span>FREE DELIVERY FOR ORDERS ABOVE $100</span>
            <span>✦</span>
            <span>NEW ARRIVALS EVERY WEEK</span>
            <span>✦</span>
            <span>SHOP THE LATEST COLLECTION</span>
            <span>✦</span>
        </div>
    </div>
</div>
  )
}
