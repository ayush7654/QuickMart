
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from 'lucide-react';
import { Filter } from 'lucide-react';

 import "./Testing.css";




export default function Testing() {

  return (
<div className="testing-div" >
<div className='sample-side-cart'>
  <div className="cart-item">
      <img src='/Fitness-WalkingPad1Sq.jpg'  className="item-image" />
      
      <div className="item-details">
        <div className="item-header">
          <h3 className="item-title">Tredmill</h3>
        </div>
        
        <p class="item-arrival">Est. Arrival: 22 Oct </p>
        
        <div className="item-footer">
          <div className="quantity-box">
            <button 
              className="qty-btn" 
            /*   onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1} */
            >
              -
            </button>
            <input 
              type="number" 
              className="qty-input" 
              value='1'
              readOnly 
            />
            <button 
              className="qty-btn" 
           /*    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} */
            >
              +
            </button>
          </div>
          
          <span className="item-price">$500</span>
        </div>
      </div>

      <button 
        className="delete-btn" 
      /*   onClick={() => onDelete(item.id)}  */
        aria-label="Remove item"
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
</div>
</div>





  );

  
}



