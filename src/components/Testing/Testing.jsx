import React ,{useState}from "react";
import "./Testing.css";
import IconButton from "../IconButton/IconButton";



export default function Testing() {

const [storeFilters,setStoreFilters] =useState([
  { name: "Best Sellers" },
  { name: "Latest Offers" },
  { name: "Warrenty" },
  { name: "Return Policy" },
  { name: "In Stock" },
  { name: "Fast Shipping" },
  { name: "Limited Stock" },
  { name: "COD Available" },
  { name: "Free Shipping" }
]

)

  return (
    <div className="testing-div">
   <div className="test-store-head-wrapper">
    <div className="test-store-menu">
        <IconButton
    text="Filters"
    width="10rem"
    height="2.5rem"/>

    <div className="filter-panel">
   {storeFilters.map((filter)=>
   <div className="test-filter-div">
    
    {filter.name}
   <div className="filter-selector"><span className="filter-selector-circle"></span></div>
   </div>)}

   <div className="filter-btn-div">
    <div className="test-filter-btn">Apply</div>
    <div className="test-filter-btn" >Clear</div>
   </div>
    </div>
    
    </div>
  
   if the brick design doent work, try adding a circle fillig design , 
   </div>
     
    </div>
  );
};
