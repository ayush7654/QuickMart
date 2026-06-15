import {useState,useEffect} from 'react'

import ZoomImage from './ZoomImage';
import { ZoomIn } from "lucide-react";
import { FiZoomIn } from "react-icons/fi";
import { FaSearchPlus } from "react-icons/fa";
import { IoChevronDownOutline } from "react-icons/io5";
import { FiChevronDown } from "react-icons/fi";
import { HiOutlineChevronDown } from "react-icons/hi";
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import { ChevronLeft,ChevronRight } from 'lucide-react';
import { FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './CarouselComponent.css'
export default function CarouselComponent({Imagelist,product}) {
  
  const [ImgId,setImgId]= useState(0);
  

  const [isZoomEnabled, setIsZoomEnabled] = useState(false);
 
  const[imgNavOpen,setImgNavOpen] = useState(false)
 



const productStatus = product?.availabilityStatus?.toLowerCase() === 'in stock';

const handleNav = (direction) => {
    if (direction === 'next') {
      // Increase by 1, but stop if it reaches 2
      setImgId((prevId) => (prevId < 2 ? prevId + 1 : prevId));
    } else if (direction === 'prev') {
      // Decrease by 1, but stop if it reaches 0
      setImgId((prevId) => (prevId > 0 ? prevId - 1 : prevId));
    }
  };
 

  return (
 
    <div className="pd-main-Img-wrapper">
 
  
   <div className="pd-navBar"> 
    <Link to='/store' className='pd-nav-link'>Store&nbsp;</Link>/<Link className='pd-nav-link'>&nbsp;{product.category}&nbsp;</Link>/<span>&nbsp;{product.title}</span>
    </div>  {/*  {product.brand?product.brand:product.category} */}


      
      <div className='main-ImageBox-wrapper'>  

 

  

        <div className="main-ImageBox">
           <ZoomImage src={`${Imagelist[ImgId]}`} isZoomEnabled={isZoomEnabled} /> 
           </div>
           <div className="main-Img-btn-wrapper">
            <div className="main-action-wrapper">
                <div className="pd-floating-btn zoom-btn-wrapper">
          <button 
        className={`zoom-btn ${isZoomEnabled ? 'active' : ''}`}
        onClick={() => setIsZoomEnabled(!isZoomEnabled)}
      >
        
        {isZoomEnabled ? '✕' : <FiZoomIn size={20} strokeWidth={1.5}/>}
      </button>
    </div>

    <div className="pd-floating-btn fav-btn-wrapper">
      <FiHeart size={20} strokeWidth={1.5}/>
    </div>
            </div>



            <div className="main-nav-wrapper">
  <div className="pd-floating-btn img-nav-left"
    onClick={() => handleNav('prev')}>
      
        < ChevronLeft  strokeWidth={1.5}/>
    </div>

    <div className="pd-floating-btn img-nav-right"
    onClick={() => handleNav('next')}>
       < ChevronRight   strokeWidth={1.5}/>
    </div>
            </div>
           </div>


 

  
      </div>
   
   
  <div className="ImageSelector">
      {Imagelist.map((img,index)=>
     <div key={index} className={`pd-img-selecter ${ImgId===index?'pd-img-active':''}`}
    onClick={()=>setImgId(index)} >
   <img src={`${img}`}/>    
 
      </div>)}
  </div>

     
 

    </div>
   
   
  )
}
