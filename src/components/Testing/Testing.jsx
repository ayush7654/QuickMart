import { useEffect, useRef, useState } from "react";
import "./Testing.css";
import ScrollButton from "../ScrollingButton/ScrollingButton";
import AppleVideoCard from "../../pages/Home/AppleComponent/AppleVideoCard/AppleVideoCard";

export default function Testing() {


  return (
    <div className="testing-div">
 <div className="test-card">
      {/* Top Badge */}
      <div className="card-badge">20% off</div>

      {/* Content Overlay (The Glass Layer) */}
      <div className="card-glass-content">
       
      </div>

      <div className="card-content">
 <div className="card-header">
          <h2 className="product-title">Alphonso</h2>
          <span className="price-tag">₹270</span>
        </div>

        <div className="product-desc">
          Loved worldwide for their sweetness our Alphonso mangoes are a 
          delicious delight
        </div>

        <div className="tag-row">
          <span className="info-tag">Best Seller</span>
          <span className="info-tag">9 left</span>
        </div>

        <button className="add-to-cart-btn">Add To Cart</button>
      </div>
    </div>
</div>
)
}