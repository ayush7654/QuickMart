import {useState,useEffect} from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'

export default function CarouselComponent({Imagelist}) {
  
  const [ImgId,setImgId]= useState(0);
  const [imageWidth, setImageWidth] = useState(600); // Default width

  // Function to update the image width based on screen size
  const updateImageWidth = () => {
    if (window.innerWidth < 400) {
      setImageWidth(250); // Example: smaller width for mobile devices
    } else if(window.innerWidth < 600) {
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
    updateImageWidth(); // Set initial width
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
      <div className="carousel-sub-div">
      <button className='leftArrow'  onClick={()=>handleSlide('left')} ><div><ChevronLeft className='left-arrow-content' /></div></button>
      <div className='ImageBox'>  
       {Imagelist.map((img,index)=>  // We render all the images together side by side.
       <img 
       className='currentImage'
       key={index} 
       src={img}
       style={{translate:`${-ImgId*imageWidth}px`}} //This property moves the image outside of the image box to a distance equal to its length.
       />)}
      </div>
      <button className='rightArrow'  onClick={()=>handleSlide('right')} ><div><ChevronRight className='right-arrow-content' /></div></button>
      </div>
      <div className="ImgSelecters">
      {Imagelist.map((item,index)=><div id={index} onClick={()=>handleClick(index)} className={ImgId===index?"imgBtn-clicked":'imgBtn'} key={index}></div>)}
    </div>
    </div>
   
   
  )
}
