import {useState,useEffect} from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'
import ZoomImage from './ZoomImage';
import { ZoomIn } from "lucide-react";
import { FiZoomIn } from "react-icons/fi";
import { FaSearchPlus } from "react-icons/fa";

import './CarouselComponent.css'
export default function CarouselComponent({Imagelist,product}) {
  
  const [ImgId,setImgId]= useState(0);
  const [imageWidth, setImageWidth] = useState(600); // Default width

  const [isZoomEnabled, setIsZoomEnabled] = useState(false);




 

  // Function to update the image width based on screen size
  const updateImageWidth = () => {
   if(window.innerWidth < 600) {
      setImageWidth(300); // Example: default width for larger screens
    } else if(window.innerWidth < 745) {
      setImageWidth(500); // Example: default width for larger screens
    }else if(window.innerWidth < 950) {
      setImageWidth(300); // Example: default width for larger screens
    } else if(window.innerWidth < 1125) {
      setImageWidth(400); // Example: default width for larger screens
    } else if(window.innerWidth <= 1360) {
      setImageWidth(500); // Example: default width for larger screens
    }else{
      setImageWidth(600)
    }
  };

  // Use effect to listen for resize and apply changes
  useEffect(() => {
    updateImageWidth(); 
    window.addEventListener('resize', updateImageWidth); // Listen for window resize

    return () => {
      window.removeEventListener('resize', updateImageWidth); // Clean up event listener
    };
  }, []);



  

  const handleSlide=(direction)=>{
    
    if(ImgId>0 || ImgId<Imagelist.length-1){
      setImgId(prev=>{
        if(direction==='left' && prev>0){
           return prev-1;
        }else if(direction==='right' && prev<Imagelist.length-1){
          return prev+1;
        }else{
          return prev;
        }
      })
    }
    }
   
  const handleClick=(id)=>{
    setImgId(id)
  }

 
 

  return (
 
    <div className="carousel-div">
      <button 
        className={`zoom-btn ${isZoomEnabled ? 'active' : ''}`}
        onClick={() => setIsZoomEnabled(!isZoomEnabled)}
      >
        {isZoomEnabled ? '✕' : <FiZoomIn size={25} strokeWidth={1.5}/>}
      </button>

      {product.availabilityStatus!=='In Stock'?<div className='pd-out-of-stock'>{product.availabilityStatus}</div>:''}
      
      <div className='ImageBox'>  
       {Imagelist.map((img,index)=> 
       <div key={index} className='currentImage-wrapper' style={{translate:`${-ImgId*100}%`}}>
       

       <ZoomImage src={img} isZoomEnabled={isZoomEnabled} />
       </div> // We render all the images together side by side.
    )}
      </div>
   
   <div className='crousal-navigation'>
    <div id='crousal-nav' onClick={()=>handleSlide('left')} ><ChevronLeft/></div>
    <div id='crousal-nav' onClick={()=>handleSlide('right')}><ChevronRight/></div>
   </div>
     
      <div className="ImgSelecters">
        
      {Imagelist.map((item,index)=><div id={index} onClick={()=>handleClick(index)} className={ImgId===index?"imgBtn-clicked-div":'imgBtn-div'} key={index}><div className='imgBtn'></div></div>)}
        
    </div>
    </div>
   
   
  )
}
