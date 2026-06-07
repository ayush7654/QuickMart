import {useState,useEffect} from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'
import ZoomImage from './ZoomImage';
import { ZoomIn } from "lucide-react";
import { FiZoomIn } from "react-icons/fi";
import { FaSearchPlus } from "react-icons/fa";
import { IoChevronDownOutline } from "react-icons/io5";
import { FiChevronDown } from "react-icons/fi";
import { HiOutlineChevronDown } from "react-icons/hi";

import './CarouselComponent.css'
export default function CarouselComponent({Imagelist,product}) {
  
  const [ImgId,setImgId]= useState(0);
  

  const [isZoomEnabled, setIsZoomEnabled] = useState(false);
 
  const[imgNavOpen,setImgNavOpen] = useState(false)




const productStatus = product?.availabilityStatus?.toLowerCase() === 'in stock';


 

  return (
 
    <div className="carousel-div">
    <div className="zoom-btn-wrapper">
          <button 
        className={`zoom-btn ${isZoomEnabled ? 'active' : ''}`}
        onClick={() => setIsZoomEnabled(!isZoomEnabled)}
      >
        
        {isZoomEnabled ? '✕' : <FiZoomIn size={25} strokeWidth={1.5}/>}
      </button>
    </div>
  




      
      <div className='ImageBox'>  


<div className={`pd-stock-state ${
  product?.availabilityStatus?.toLowerCase() === 'out of stock' 
    ? 'stock-out' 
    : product?.availabilityStatus?.toLowerCase() === 'low stock' 
    ? 'stock-low' 
    : ''
}`}>
  {product?.availabilityStatus}
</div>

      <ZoomImage src={`${Imagelist[ImgId]}`} isZoomEnabled={isZoomEnabled} />
      </div>
   

     
 

    <div className="pd-Img-browse">
      <div className={`pd-Img-browse-wrapper ${imgNavOpen?'img-Nav-Open':''}`}>
            {Imagelist.map((img,index)=>
     <div key={index} className='pd-img-selecter'
    onClick={()=>setImgId(index)} >
   <img src={`${img}`}/>    
 
      </div>)}
      </div>
 
    {Imagelist.length>1 &&  <div className='pd-Img-down' onClick={()=>setImgNavOpen(prev=>!prev)}>< HiOutlineChevronDown size={20} className={`img-nav-arrow ${imgNavOpen?'img-nav-up':''}`}/></div>}
    </div>
    </div>
   
   
  )
}
